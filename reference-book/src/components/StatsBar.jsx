import React from 'react';

function StatsBar({ bookCount, currentQuery, loading }) {
    return (
        <div className="stats-bar">
            <div className="result-badge">
                <i className="fas fa-chart-line"></i> {loading ? 'Searching...' : `${bookCount} reference books found`}
            </div>
            {currentQuery && !loading && (
                <div className="concept-badge">
                    <i className="fas fa-location-dot"></i> "{currentQuery}" → Page predictions active
                </div>
            )}
            <style>{`
                .stats-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                    margin: 1rem 0;
                }
                .result-badge, .concept-badge {
                    background: rgba(139,92,246,0.2);
                    padding: 0.4rem 1.2rem;
                    border-radius: 40px;
                    font-size: 0.8rem;
                }
                .concept-badge {
                    background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.2));
                }
            `}</style>
        </div>
    );
}

export default StatsBar;