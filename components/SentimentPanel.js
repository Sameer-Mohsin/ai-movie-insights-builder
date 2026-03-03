'use client';

export default function SentimentPanel({ sentiment, isLoading }) {
    if (isLoading) {
        return (
            <div className="section" style={{ animationDelay: '0.3s' }}>
                <div className="glass-card">
                    <h2 className="section__title">
                        <span className="section__title-icon">🤖</span> AI Sentiment Analysis
                    </h2>
                    <div className="skeleton">
                        <div className="skeleton__line skeleton__line--short" />
                        <div className="skeleton__line" />
                        <div className="skeleton__line skeleton__line--medium" />
                        <div className="skeleton__badges" style={{ marginTop: '16px' }}>
                            <div className="skeleton__badge" />
                            <div className="skeleton__badge" />
                            <div className="skeleton__badge" />
                        </div>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '16px' }}>
                        ✨ Analyzing audience reviews with AI...
                    </p>
                </div>
            </div>
        );
    }

    if (!sentiment) return null;

    const classification = sentiment.classification || 'mixed';

    return (
        <div className="section" style={{ animationDelay: '0.3s' }}>
            <div className={`glass-card sentiment sentiment--${classification}`}>
                <h2 className="section__title">
                    <span className="section__title-icon">🤖</span> AI Sentiment Analysis
                </h2>

                <div className="sentiment__header">
                    <span className={`sentiment__badge sentiment__badge--${classification}`}>
                        <span className="sentiment__badge-dot" />
                        {classification === 'positive' && '👍 '}
                        {classification === 'mixed' && '🤔 '}
                        {classification === 'negative' && '👎 '}
                        {classification}
                    </span>
                    <span className="sentiment__ai-label">
                        ✨ Powered by Gemini AI
                    </span>
                </div>

                <p className="sentiment__summary">{sentiment.summary}</p>

                {sentiment.themes && sentiment.themes.length > 0 && (
                    <div className="sentiment__themes">
                        <span className="sentiment__themes-label">Key Themes</span>
                        {sentiment.themes.map((theme, i) => (
                            <span key={i} className="sentiment__theme-tag">
                                {theme}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
