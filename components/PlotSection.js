'use client';

export default function PlotSection({ movie }) {
    return (
        <div className="section" style={{ animationDelay: '0.1s' }}>
            <div className="glass-card">
                <h2 className="section__title">
                    <span className="section__title-icon">📖</span> Plot
                </h2>
                <p className="plot__text">{movie.plot}</p>

                <div className="plot__details">
                    {movie.director && movie.director !== 'N/A' && (
                        <div className="plot__detail">
                            <span className="plot__detail-label">Director</span>
                            <span className="plot__detail-value">{movie.director}</span>
                        </div>
                    )}
                    {movie.awards && movie.awards !== 'N/A' && (
                        <div className="plot__detail">
                            <span className="plot__detail-label">Awards</span>
                            <span className="plot__detail-value">{movie.awards}</span>
                        </div>
                    )}
                    {movie.boxOffice && movie.boxOffice !== 'N/A' && (
                        <div className="plot__detail">
                            <span className="plot__detail-label">Box Office</span>
                            <span className="plot__detail-value">{movie.boxOffice}</span>
                        </div>
                    )}
                    {movie.metascore && movie.metascore !== 'N/A' && (
                        <div className="plot__detail">
                            <span className="plot__detail-label">Metascore</span>
                            <span className="plot__detail-value">{movie.metascore}/100</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
