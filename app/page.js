'use client';

import { useState, useCallback } from 'react';
import SearchBar from '@/components/SearchBar';
import MovieHero from '@/components/MovieHero';
import PlotSection from '@/components/PlotSection';
import CastList from '@/components/CastList';
import SentimentPanel from '@/components/SentimentPanel';
import SkeletonLoader from '@/components/SkeletonLoader';
import ErrorCard from '@/components/ErrorCard';

export default function Home() {
  const [movie, setMovie] = useState(null);
  const [sentiment, setSentiment] = useState(null);
  const [isLoadingMovie, setIsLoadingMovie] = useState(false);
  const [isLoadingSentiment, setIsLoadingSentiment] = useState(false);
  const [error, setError] = useState(null);
  const [sentimentError, setSentimentError] = useState(null);
  const [lastSearchedId, setLastSearchedId] = useState('');

  const fetchSentiment = useCallback(async (imdbId, movieTitle) => {
    setIsLoadingSentiment(true);
    setSentimentError(null);

    try {
      // Step 1: Fetch reviews from TMDB
      const reviewsRes = await fetch(`/api/reviews?id=${imdbId}`);
      const reviewsData = await reviewsRes.json();

      if (!reviewsRes.ok || !reviewsData.reviews || reviewsData.reviews.length === 0) {
        setSentiment({
          summary: 'No audience reviews available for this movie on TMDB. Sentiment analysis requires user reviews to generate insights.',
          classification: 'mixed',
          themes: ['No reviews found'],
        });
        return;
      }

      // Step 2: Analyze sentiment with Gemini AI
      const sentimentRes = await fetch('/api/sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviews: reviewsData.reviews,
          movieTitle: movieTitle,
          movieId: imdbId,
        }),
      });

      const sentimentData = await sentimentRes.json();

      if (!sentimentRes.ok) {
        setSentimentError(sentimentData.error || 'Failed to analyze sentiment');
        return;
      }

      setSentiment(sentimentData);
    } catch (err) {
      console.error('Sentiment fetch error:', err);
      setSentimentError('Failed to analyze audience sentiment. Please try again.');
    } finally {
      setIsLoadingSentiment(false);
    }
  }, []);

  const handleSearch = useCallback(async (imdbId) => {
    // Reset state
    setMovie(null);
    setSentiment(null);
    setError(null);
    setSentimentError(null);
    setIsLoadingMovie(true);
    setLastSearchedId(imdbId);

    try {
      // Fetch movie data from OMDb
      const res = await fetch(`/api/movie?id=${imdbId}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to fetch movie data');
        return;
      }

      setMovie(data);

      // Fetch sentiment in parallel (non-blocking)
      fetchSentiment(imdbId, data.title);
    } catch (err) {
      console.error('Movie fetch error:', err);
      setError('Failed to fetch movie data. Please check your connection and try again.');
    } finally {
      setIsLoadingMovie(false);
    }
  }, [fetchSentiment]);

  const handleRetry = useCallback(() => {
    if (lastSearchedId) {
      handleSearch(lastSearchedId);
    }
  }, [lastSearchedId, handleSearch]);

  return (
    <main className="app">
      <header className="header">
        <span className="header__icon">🎬</span>
        <h1 className="header__title">Movie Insight Builder</h1>
        <p className="header__subtitle">
          AI-powered movie analysis &amp; audience sentiment
        </p>
      </header>

      <SearchBar onSearch={handleSearch} isLoading={isLoadingMovie} />

      {isLoadingMovie && <SkeletonLoader />}

      {error && <ErrorCard error={error} onRetry={handleRetry} />}

      {movie && (
        <>
          <MovieHero movie={movie} />
          <PlotSection movie={movie} />
          <CastList actors={movie.actors} />

          {sentimentError ? (
            <ErrorCard error={sentimentError} />
          ) : (
            <SentimentPanel
              sentiment={sentiment}
              isLoading={isLoadingSentiment}
            />
          )}
        </>
      )}

      <footer className="footer">
        <p className="footer__text">
          Built with Next.js • OMDb • TMDB • Google Gemini AI
        </p>
      </footer>
    </main>
  );
}
