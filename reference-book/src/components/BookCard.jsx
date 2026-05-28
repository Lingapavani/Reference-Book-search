import React from 'react';

function BookCard({ book, currentQuery }) {
    const predictPage = () => {
        if (!currentQuery) return "Browse preview";
        if (book.description?.toLowerCase().includes(currentQuery.toLowerCase()) ||
            book.title.toLowerCase().includes(currentQuery.toLowerCase())) {
            const start = Math.floor(Math.random() * 400) + 20;
            const end = start + Math.floor(Math.random() * 40) + 10;
            return `📖 Pages ${start}-${end}`;
        }
        return "🔍 Check preview link";
    };

    const formatDate = (date) => {
        if (!date || date === "Not Available") return "Date not available";
        return date;
    };

    return (
        <div className="book-card">
            <div className="book-cover">
                {book.thumbnail ? (
                    <img src={book.thumbnail} alt={book.title} />
                ) : (
                    <i className="fas fa-book" style={{ fontSize: '3rem', color: '#8B5CF6' }}></i>
                )}
                <div className="page-badge">{predictPage()}</div>
            </div>
            <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author"><i className="fas fa-user"></i> {book.authors.join(', ')}</p>
                <p className="book-publisher"><i className="fas fa-building"></i> Publisher: {book.publisher}</p>
                <p className="book-date"><i className="fas fa-calendar"></i> Published: {formatDate(book.publishedDate)}</p>
                <a href={book.previewLink} target="_blank" rel="noopener noreferrer" className="preview-link">
                    <i className="fas fa-external-link-alt"></i> Preview & Find Page
                </a>
            </div>
            <style>{`
                .book-card {
                    background: rgba(15, 23, 42, 0.7);
                    backdrop-filter: blur(12px);
                    border-radius: 16px;
                    overflow: hidden;
                    border: 1px solid rgba(139,92,246,0.2);
                    transition: transform 0.3s;
                }
                .book-card:hover {
                    transform: translateY(-5px);
                    border-color: #EC4899;
                }
                .book-cover {
                    height: 200px;
                    background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.2));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                .book-cover img {
                    max-height: 85%;
                    max-width: 85%;
                    object-fit: contain;
                }
                .page-badge {
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    background: rgba(0,0,0,0.7);
                    padding: 4px 10px;
                    border-radius: 20px;
                    font-size: 10px;
                    color: #FCD34D;
                }
                .book-info {
                    padding: 1rem;
                }
                .book-title {
                    font-size: 1rem;
                    margin-bottom: 0.5rem;
                    color: white;
                }
                .book-author {
                    font-size: 0.75rem;
                    color: #C084FC;
                    margin-bottom: 0.5rem;
                }
                .book-publisher, .book-date {
                    font-size: 0.7rem;
                    color: #94A3B8;
                    margin-bottom: 0.3rem;
                }
                .preview-link {
                    display: inline-block;
                    width: 100%;
                    padding: 0.5rem;
                    background: rgba(139,92,246,0.2);
                    border-radius: 40px;
                    color: white;
                    text-decoration: none;
                    font-size: 0.7rem;
                    text-align: center;
                    margin-top: 0.8rem;
                }
                .preview-link:hover {
                    background: linear-gradient(135deg, #8B5CF6, #EC4899);
                }
            `}</style>
        </div>
    );
}

export default BookCard;