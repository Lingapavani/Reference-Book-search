import React, { useState } from 'react';

function VoiceSearch({ onVoiceResult }) {
    const [isListening, setIsListening] = useState(false);

    const handleVoiceSearch = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (!SpeechRecognition) {
            alert('Voice search is not supported in your browser. Please use Chrome, Edge, or Safari.');
            return;
        }
        
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        
        recognition.onstart = () => {
            setIsListening(true);
        };
        
        recognition.onresult = (event) => {
            const spoken = event.results[0][0].transcript;
            setIsListening(false);
            if (onVoiceResult) {
                onVoiceResult(spoken);
            }
        };
        
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
            alert('Voice recognition error: ' + event.error + '. Please try again.');
        };
        
        recognition.onend = () => {
            setIsListening(false);
        };
        
        recognition.start();
    };

    return (
        <button 
            onClick={handleVoiceSearch} 
            className={`btn-glow voice-btn ${isListening ? 'listening' : ''}`}
        >
            <i className="fas fa-microphone-alt"></i> 
            {isListening ? 'Listening...' : 'Voice'}
        </button>
    );
}

export default VoiceSearch;