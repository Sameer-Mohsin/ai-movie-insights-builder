'use client';

export default function ErrorCard({ error, onRetry }) {
    const isNotFound = error?.toLowerCase().includes('not found');

    return (
        <div className="glass-card error-card">
            <span className="error-card__icon">
                {isNotFound ? '🔍' : '⚠️'}
            </span>
            <h3 className="error-card__title">
                {isNotFound ? 'Movie Not Found' : 'Something Went Wrong'}
            </h3>
            <p className="error-card__message">{error}</p>
            {onRetry && (
                <button id="retry-button" className="error-card__btn" onClick={onRetry}>
                    Try Again
                </button>
            )}
        </div>
    );
}
