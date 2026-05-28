import React, { useState } from 'react';

function FilterBar({ authors, onFilterChange, onSurprise }) {
    const [selectedAuthor, setSelectedAuthor] = useState('');

    const handleAuthorChange = (e) => {
        const value = e.target.value;
        setSelectedAuthor(value);
        onFilterChange(value);
    };

    return (
        <div className="filter-section">
            <div className="author-filter">
                <i className="fas fa-filter" style={{ color: '#8B5CF6' }}></i>
                <span>Filter by Author:</span>
                <select value={selectedAuthor} onChange={handleAuthorChange} className="author-select">
                    <option value="">All Authors</option>
                    {authors.map(author => (
                        <option key={author} value={author}>
                            {author.length > 30 ? author.substring(0, 27) + '...' : author}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={onSurprise} className="surprise-btn">
                <i className="fas fa-magic"></i> Surprise Me! 🎲
            </button>

            <style jsx>{`
                .filter-section {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }
                .author-filter {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    background: rgba(255,255,255,0.1);
                    padding: 0.5rem 1.2rem;
                    border-radius: 60px;
                    backdrop-filter: blur(10px);
                }
                .author-filter span {
                    font-size: 0.85rem;
                    color: #CBD5E1;
                    font-weight: 500;
                }
                .author-select {
                    background: #1E293B;
                    border: 1px solid rgba(139, 92, 246, 0.4);
                    color: #FFFFFF;
                    font-family: inherit;
                    padding: 0.4rem 0.8rem;
                    border-radius: 30px;
                    cursor: pointer;
                    font-size: 0.85rem;
                    min-width: 150px;
                }
                .author-select option {
                    background: #1E293B;
                    color: #FFFFFF;
                    padding: 0.5rem;
                }
                .author-select:focus {
                    outline: none;
                    border-color: #8B5CF6;
                }
                .surprise-btn {
                    background: linear-gradient(135deg, #F59E0B, #EF4444);
                    border: none;
                    padding: 0.5rem 1.3rem;
                    border-radius: 60px;
                    color: white;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.85rem;
                }
                .surprise-btn:hover {
                    transform: scale(1.02);
                    box-shadow: 0 5px 15px rgba(245, 158, 11, 0.4);
                }
                @media (max-width: 768px) {
                    .author-select { min-width: 120px; font-size: 0.75rem; }
                    .author-filter span { font-size: 0.75rem; }
                }
            `}</style>
        </div>
    );
}

export default FilterBar;