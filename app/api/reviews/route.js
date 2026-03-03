import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || !/^tt\d{7,8}$/.test(id)) {
        return NextResponse.json(
            { error: 'Invalid IMDb ID format.' },
            { status: 400 }
        );
    }

    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
        return NextResponse.json(
            { error: 'TMDB API key is not configured. Please set TMDB_API_KEY in your .env.local file.' },
            { status: 500 }
        );
    }

    try {
        // Step 1: Find TMDB movie ID from IMDb ID
        const findResponse = await fetch(
            `https://api.themoviedb.org/3/find/${id}?api_key=${apiKey}&external_source=imdb_id`
        );

        if (!findResponse.ok) {
            throw new Error(`TMDB find API responded with status ${findResponse.status}`);
        }

        const findData = await findResponse.json();
        const movieResults = findData.movie_results;

        if (!movieResults || movieResults.length === 0) {
            return NextResponse.json(
                { error: 'Movie not found on TMDB.' },
                { status: 404 }
            );
        }

        const tmdbId = movieResults[0].id;

        // Step 2: Fetch reviews for the movie
        const reviewsResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${tmdbId}/reviews?api_key=${apiKey}&language=en-US&page=1`
        );

        if (!reviewsResponse.ok) {
            throw new Error(`TMDB reviews API responded with status ${reviewsResponse.status}`);
        }

        const reviewsData = await reviewsResponse.json();
        const reviews = (reviewsData.results || [])
            .slice(0, 20)
            .map((review) => ({
                author: review.author,
                content: review.content.substring(0, 500), // Limit each review to 500 chars
                rating: review.author_details?.rating || null,
            }));

        return NextResponse.json({
            tmdbId,
            totalReviews: reviewsData.total_results,
            reviews,
        });
    } catch (err) {
        console.error('TMDB API error:', err);
        return NextResponse.json(
            { error: 'Failed to fetch reviews. Please try again later.' },
            { status: 500 }
        );
    }
}
