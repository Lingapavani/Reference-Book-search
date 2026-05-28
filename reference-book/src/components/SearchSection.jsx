import React, { useState } from 'react';
import VoiceSearch from './VoiceSearch';

function SearchSection({ onSearch, currentMode, setCurrentMode }) {
    const [conceptInput, setConceptInput] = useState('');
    const [authorInput, setAuthorInput] = useState('');

    const handleConceptSearch = () => {
        if (conceptInput.trim()) {
            onSearch(conceptInput.trim(), 'concept');
        } else {
            alert('Enter a concept to search');
        }
    };

    const handleAuthorSearch = () => {
        if (authorInput.trim()) {
            onSearch(authorInput.trim(), 'author');
        } else {
            alert('Enter an author name');
        }
    };

    const handleVoiceResult = (spokenText) => {
        setConceptInput(spokenText);
        onSearch(spokenText, 'concept');
    };

    return (
        <div className="search-card">
            <div className="search-tabs">
                <button 
                    className={`tab ${currentMode === 'concept' ? 'active' : ''}`}
                    onClick={() => setCurrentMode('concept')}
                >
                    <i className="fas fa-graduation-cap"></i> Concept Search
                </button>
                <button 
                    className={`tab ${currentMode === 'author' ? 'active' : ''}`}
                    onClick={() => setCurrentMode('author')}
                >
                    <i className="fas fa-user-edit"></i> Author Search
                </button>
            </div>

            {currentMode === 'concept' ? (
                <div className="search-area">
                    <div className="input-group-modern">
                        <i className="fas fa-lightbulb"></i>
                        <input 
                            type="text" 
                            value={conceptInput}
                            onChange={(e) => setConceptInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleConceptSearch()}
                            placeholder="e.g., 'Machine Learning', 'Database Management', 'Calculus'"
                        />
                    </div>
                    <button onClick={handleConceptSearch} className="btn-glow">
                        <i className="fas fa-search"></i> Locate & Predict Pages
                    </button>
                    <VoiceSearch onVoiceResult={handleVoiceResult} />
                </div>
            ) : (
                <div className="search-area">
                    <div className="input-group-modern">
                        <i className="fas fa-feather-alt"></i>
                        <input 
                            type="text" 
                            value={authorInput}
                            onChange={(e) => setAuthorInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAuthorSearch()}
                            placeholder="Author name: e.g., 'Robert Sedgewick', 'Yuval Noah Harari'"
                        />
                    </div>
                    <button onClick={handleAuthorSearch} className="btn-glow">
                        <i className="fas fa-user-graduate"></i> Find Books by Author
                    </button>
                </div>
            )}
        </div>
    );
}

export default SearchSection;