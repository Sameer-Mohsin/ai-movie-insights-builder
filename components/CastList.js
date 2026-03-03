'use client';

export default function CastList({ actors }) {
    if (!actors || actors === 'N/A') return null;

    const castMembers = actors.split(', ');

    return (
        <div className="section" style={{ animationDelay: '0.2s' }}>
            <h2 className="section__title">
                <span className="section__title-icon">🎭</span> Cast
            </h2>
            <div className="cast__list">
                {castMembers.map((actor) => (
                    <div key={actor} className="cast__card">
                        {actor}
                    </div>
                ))}
            </div>
        </div>
    );
}
