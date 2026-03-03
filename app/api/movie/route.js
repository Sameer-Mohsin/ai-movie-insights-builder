import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  // Validate IMDb ID format
  if (!id || !/^tt\d{7,8}$/.test(id)) {
    return NextResponse.json(
      { error: 'Invalid IMDb ID format. Expected format: tt followed by 7-8 digits (e.g., tt0133093)' },
      { status: 400 }
    );
  }

  const apiKey = process.env.OMDB_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'OMDb API key is not configured. Please set OMDB_API_KEY in your .env.local file.' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}&plot=full`
    );

    if (!response.ok) {
      throw new Error(`OMDb API responded with status ${response.status}`);
    }

    const data = await response.json();

    if (data.Response === 'False') {
      return NextResponse.json(
        { error: data.Error || 'Movie not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      title: data.Title,
      year: data.Year,
      rated: data.Rated,
      released: data.Released,
      runtime: data.Runtime,
      genre: data.Genre,
      director: data.Director,
      actors: data.Actors,
      plot: data.Plot,
      poster: data.Poster !== 'N/A' ? data.Poster : null,
      imdbRating: data.imdbRating,
      imdbVotes: data.imdbVotes,
      awards: data.Awards,
      boxOffice: data.BoxOffice,
      metascore: data.Metascore,
    });
  } catch (err) {
    console.error('OMDb API error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch movie data. Please try again later.' },
      { status: 500 }
    );
  }
}
