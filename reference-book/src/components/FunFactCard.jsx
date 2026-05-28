import React, { useEffect, useRef } from 'react';

function FunFactCard({ title, content }) {
    const cardRef = useRef(null);

    useEffect(() => {
        if (cardRef.current) {
            cardRef.current.style.animation = 'fadeInUp 0.5s ease';
        }
    }, []);

    return (
        <div className="fun-fact-card" ref={cardRef}>
            <i className="fas fa-lightbulb"></i>
            <h4>{title}</h4>
            <p>{content}</p>
            <p className="tip-text">
                ✨ Tip: Try searching "Machine Learning", "Data Structures", or "Quantum Physics" to discover great reference books!
            </p>

            <style jsx>{`
                .fun-fact-card {
                    background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.2));
                    border-radius: 1rem;
                    padding: 1rem;
                    margin-bottom: 1.5rem;
                    text-align: center;
                    border: 1px solid rgba(139,92,246,0.3);
                    backdrop-filter: blur(10px);
                }
                .fun-fact-card i {
                    font-size: 1.8rem;
                    color: #F59E0B;
                    margin-bottom: 0.5rem;
                }
                .fun-fact-card h4 {
                    color: #FFE66D;
                    margin-bottom: 0.5rem;
                    font-size: 1rem;
                }
                .fun-fact-card p {
                    color: #CBD5E1;
                    font-size: 0.85rem;
                }
                .tip-text {
                    font-size: 0.7rem;
                    margin-top: 0.5rem;
                    color: #A78BFA;
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}

export default FunFactCard;