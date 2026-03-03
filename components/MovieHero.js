'use client';

export default function MovieHero({ movie }) {
    const genres = movie.genre ? movie.genre.split(', ') : [];

    return (
        <div className="hero">
            <div className="hero__poster-wrapper">
                {movie.poster ? (
                    <>
                        <img
                            className="hero__poster"
                            src={movie.poster}
                            alt={`${movie.title} poster`}
                            loading="eager"
                        />
                        <div className="hero__poster-glow" />
                    </>
                ) : (
                    <div className="hero__no-poster">
                        <span>🎬</span>
                        No poster available
                    </div>
                )}
            </div>

            <div className="hero__info">
                <h1 className="hero__title">{movie.title}</h1>

                <div className="hero__meta">
                    {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                        <span className="hero__rating">
                            ⭐ {movie.imdbRating}/10
                        </span>
                    )}
                    {movie.year && (
                        <span className="hero__meta-item">📅 {movie.year}</span>
                    )}
                    {movie.runtime && movie.runtime !== 'N/A' && (
                        <span className="hero__meta-item">⏱️ {movie.runtime}</span>
                    )}
                    {movie.rated && movie.rated !== 'N/A' && (
                        <span className="hero__meta-item">🔖 {movie.rated}</span>
                    )}
                </div>

                {genres.length > 0 && (
                    <div className="hero__genres">
                        {genres.map((genre) => (
                            <span key={genre} className="hero__genre-badge">
                                {genre}
                            </span>
                        ))}
                    </div>
                )}

                {movie.imdbVotes && movie.imdbVotes !== 'N/A' && (
                    <span className="hero__meta-item" style={{ fontSize: '0.82rem' }}>
                        🗳️ {movie.imdbVotes} votes
                    </span>
                )}
            </div>
        </div>
    );
}
