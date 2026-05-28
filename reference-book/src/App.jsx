import React, { useState, useEffect } from 'react';
import './styles/App.scss';
import SearchSection from './components/SearchSection';
import FilterBar from './components/FilterBar';
import StatsBar from './components/StatsBar';
import BookCard from './components/BookCard';
import FunFactCard from './components/FunFactCard';
import { searchBooks } from './services/bookApi';

function App() {
    const [allBooks, setAllBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [currentMode, setCurrentMode] = useState('concept');
    const [currentQuery, setCurrentQuery] = useState('');
    const [currentAuthorFilter, setCurrentAuthorFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [showFunFact, setShowFunFact] = useState(false);
    const [funFactData, setFunFactData] = useState(null);

    const funFacts = [
        { title: "📚 Did You Know?", content: "Reading 20 minutes a day exposes you to 1.8 million words per year!" },
        { title: "💡 Study Tip", content: "The Pomodoro Technique (25 min study, 5 min break) improves focus by 40%!" },
        { title: "🧠 Brain Fact", content: "Your brain processes visuals 60,000x faster than text. Use diagrams!" },
        { title: "⭐ Motivation", content: "You're 42% more likely to achieve your goals if you write them down!" },
        { title: "📖 Learning Hack", content: "Teaching others is the fastest way to master a subject!" },
        { title: "🎯 Focus Tip", content: "Put your phone in another room while studying - distraction drops by 50%!" },
        { title: "💪 Study Boost", content: "Exercise before studying increases memory retention by 20%!" },
        { title: "🎧 Productivity", content: "Lo-fi music or nature sounds can improve concentration significantly!" }
    ];

    const handleSearch = async (query, type = 'concept') => {
        setLoading(true);
        setShowFunFact(false);
        
        const result = await searchBooks(query, type);
        
        if (result && result.length > 0) {
            setAllBooks(result);
            setFilteredBooks(result);
            setCurrentQuery(query);
        } else {
            setAllBooks([]);
            setFilteredBooks([]);
        }
        
        setLoading(false);
    };

    const handleSurprise = () => {
        const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
        setFunFactData(randomFact);
        setShowFunFact(true);
        
        setTimeout(() => {
            setShowFunFact(false);
        }, 6000);
    };

    const updateAuthorFilter = (authorValue) => {
        setCurrentAuthorFilter(authorValue);
        if (!authorValue) {
            setFilteredBooks([...allBooks]);
        } else {
            setFilteredBooks(allBooks.filter(book => 
                book.authors.some(a => a === authorValue)
            ));
        }
    };

    const getUniqueAuthors = () => {
        const authorsSet = new Set();
        allBooks.forEach(book => {
            book.authors.forEach(a => authorsSet.add(a));
        });
        return Array.from(authorsSet).sort();
    };

    // Create particles
    useEffect(() => {
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            for(let i = 0; i < 50; i++) {
                let particle = document.createElement('div');
                particle.classList.add('particle');
                let size = Math.random() * 4 + 2;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = 10 + Math.random() * 20 + 's';
                particlesContainer.appendChild(particle);
            }
        }
    }, []);

    return (
        <div className="app">
            <div className="animated-bg"></div>
            <div className="particles" id="particles"></div>
            
            <div className="container">
                {/* Header */}
                <div className="nav">
                    <div className="logo">
                        <div className="logo-icon">
                            <i className="fas fa-book-open"></i>
                        </div>
                        <h1>Reference Book Search</h1>
                    </div>
                    <div className="nav-stats">
                        <div className="stat-item"><i className="fas fa-microphone"></i> Voice Ready</div>
                        <div className="stat-item"><i className="fas fa-graduation-cap"></i> Smart Search</div>
                    </div>
                </div>

                <div className="hero">
                    <h2>Find Any Concept. <span>Know the Exact Page.</span></h2>
                    <p>Reference book search • Page predictions • Author filters • Voice search</p>
                </div>

                {/* Search Section */}
                <SearchSection 
                    onSearch={handleSearch}
                    currentMode={currentMode}
                    setCurrentMode={setCurrentMode}
                />

                {/* Filter Bar */}
                {allBooks.length > 0 && (
                    <FilterBar 
                        authors={getUniqueAuthors()}
                        onFilterChange={updateAuthorFilter}
                        onSurprise={handleSurprise}
                    />
                )}

                {/* Fun Fact Card */}
                {showFunFact && funFactData && (
                    <FunFactCard title={funFactData.title} content={funFactData.content} />
                )}

                {/* Stats Bar */}
                <StatsBar 
                    bookCount={filteredBooks.length}
                    currentQuery={currentQuery}
                    currentMode={currentMode}
                    loading={loading}
                />

                {/* Books Grid */}
                <div className="books-grid">
                    {loading ? (
                        <div className="loading"><i className="fas fa-spinner fa-pulse"></i> Searching reference books...</div>
                    ) : filteredBooks.length === 0 && !loading ? (
                        <div className="no-results">
                            <i className="fas fa-book-open"></i>
                            <p>No reference books found. Try different keywords.</p>
                        </div>
                    ) : (
                        filteredBooks.map(book => (
                            <BookCard key={book.id} book={book} currentQuery={currentMode === 'concept' ? currentQuery : ''} />
                        ))
                    )}
                </div>

                <footer>
                    <i className="fas fa-database"></i> Powered by Google Books API • Real-time reference book data
                </footer>
            </div>
        </div>
    );
}

export default App;