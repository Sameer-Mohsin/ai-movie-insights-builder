'use client';

export default function SkeletonLoader() {
    return (
        <div className="skeleton">
            <div className="skeleton__hero">
                <div className="skeleton__poster" />
                <div className="skeleton__info">
                    <div className="skeleton__line skeleton__line--title" />
                    <div className="skeleton__badges">
                        <div className="skeleton__badge" />
                        <div className="skeleton__badge" />
                        <div className="skeleton__badge" />
                    </div>
                    <div className="skeleton__line skeleton__line--medium" />
                    <div className="skeleton__line skeleton__line--short" />
                </div>
            </div>

            <div className="skeleton__section">
                <div className="skeleton__section-title" />
                <div className="skeleton__line" />
                <div className="skeleton__line skeleton__line--medium" />
                <div className="skeleton__line skeleton__line--short" />
            </div>

            <div className="skeleton__section">
                <div className="skeleton__section-title" />
                <div className="skeleton__badges">
                    <div className="skeleton__badge" />
                    <div className="skeleton__badge" />
                    <div className="skeleton__badge" />
                    <div className="skeleton__badge" />
                </div>
            </div>
        </div>
    );
}
