import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Simple in-memory cache for sentiment results
const sentimentCache = new Map();
// Cache duration: 1 hour
const CACHE_TTL = 60 * 60 * 1000;

export async function POST(request) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return NextResponse.json(
            { error: 'Gemini API key is not configured. Please set GEMINI_API_KEY in your .env.local file.' },
            { status: 500 }
        );
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { error: 'Invalid request body.' },
            { status: 400 }
        );
    }

    const { reviews, movieTitle, movieId } = body;

    // 1. Check Cache first
    const cacheKey = movieId || movieTitle;
    if (cacheKey && sentimentCache.has(cacheKey)) {
        const cached = sentimentCache.get(cacheKey);
        if (Date.now() - cached.timestamp < CACHE_TTL) {
            console.log(`Returning cached sentiment for: ${cacheKey}`);
            return NextResponse.json(cached.data);
        } else {
            sentimentCache.delete(cacheKey);
        }
    }

    if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
        return NextResponse.json(
            { error: 'No reviews provided for analysis.' },
            { status: 400 }
        );
    }

    if (!movieTitle || typeof movieTitle !== 'string') {
        return NextResponse.json(
            { error: 'Movie title is required.' },
            { status: 400 }
        );
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);

        // Try models in order: gemini-flash-latest is usually the most stable alias
        const models = ['gemini-flash-latest', 'gemini-2.0-flash', 'gemini-2.0-flash-lite'];

        const reviewTexts = reviews
            .map((r, i) => `Review ${i + 1}: "${typeof r === 'string' ? r : r.content}"`)
            .join('\n\n');

        const prompt = `You are a movie critic AI. Analyze the following audience reviews for the movie "${movieTitle}" and provide:

1. A concise 2-3 sentence summary of the overall audience sentiment.
2. An overall sentiment classification: exactly one of "positive", "mixed", or "negative".
3. A list of 3-5 key themes or topics mentioned across the reviews.

Reviews:
${reviewTexts}

Respond ONLY in the following JSON format, with no additional text:
{
  "summary": "Your 2-3 sentence sentiment summary here.",
  "classification": "positive|mixed|negative",
  "themes": ["theme1", "theme2", "theme3"]
}`;

        // Helper: attempt a call with one retry on rate-limit (429)
        async function tryGenerate(modelName) {
            const model = genAI.getGenerativeModel({ model: modelName });
            try {
                return await model.generateContent(prompt);
            } catch (err) {
                // If rate-limited, wait and retry once with a longer delay
                if (err.status === 429) {
                    console.log(`Rate limited on ${modelName}, waiting 20s before retry...`);
                    await new Promise((r) => setTimeout(r, 20000));
                    return await model.generateContent(prompt);
                }
                throw err;
            }
        }

        let result;
        let lastError;

        for (const modelName of models) {
            try {
                result = await tryGenerate(modelName);
                console.log(`Success with model: ${modelName}`);
                break;
            } catch (modelErr) {
                lastError = modelErr;
                console.warn(`Model ${modelName} failed, trying next...`, modelErr.message);
                continue;
            }
        }

        if (!result) {
            throw lastError || new Error('All models failed');
        }

        const responseText = result.response.text();

        // Extract JSON from the response (handle potential markdown wrapping)
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Failed to parse AI response as JSON');
        }

        const sentiment = JSON.parse(jsonMatch[0]);

        // Validate the response structure
        if (!sentiment.summary || !sentiment.classification || !sentiment.themes) {
            throw new Error('Incomplete AI response');
        }

        // Normalize classification
        const validClassifications = ['positive', 'mixed', 'negative'];
        if (!validClassifications.includes(sentiment.classification.toLowerCase())) {
            sentiment.classification = 'mixed';
        } else {
            sentiment.classification = sentiment.classification.toLowerCase();
        }

        const finalResult = {
            summary: sentiment.summary,
            classification: sentiment.classification,
            themes: Array.isArray(sentiment.themes) ? sentiment.themes.slice(0, 5) : [],
        };

        // Cache the result
        if (cacheKey) {
            sentimentCache.set(cacheKey, {
                timestamp: Date.now(),
                data: finalResult
            });
        }

        return NextResponse.json(finalResult);
    } catch (err) {
        console.error('Gemini API error:', err);
        return NextResponse.json(
            { error: 'Failed to analyze sentiment. Please try again later.' },
            { status: 500 }
        );
    }
}
