import React, { useState, useEffect } from 'react';

const GameOverModal = ({ score, difficulty, onPlayAgain }) => {
    const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty);

    useEffect(() => {
        setSelectedDifficulty(difficulty);
    }, [difficulty]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{
                backgroundColor: '#1a1a1a',
                padding: '40px',
                borderRadius: '20px',
                textAlign: 'center',
                border: '1px solid #333',
                boxShadow: '0 0 50px rgba(0, 255, 0, 0.2)',
                minWidth: '300px',
                color: 'white',
                fontFamily: 'system-ui, sans-serif'
            }}>
                <h2 style={{
                    fontSize: '3rem',
                    margin: '0 0 20px 0',
                    background: 'linear-gradient(45deg, #fff, #666)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Game Over
                </h2>

                <div style={{ marginBottom: '30px' }}>
                    <div style={{ fontSize: '1.2rem', color: '#888' }}>Final Score</div>
                    <div style={{
                        fontSize: '4rem',
                        fontWeight: 'bold',
                        color: '#00ff00',
                        textShadow: '0 0 20px rgba(0, 255, 0, 0.5)'
                    }}>
                        {score}
                    </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', color: '#ccc' }}>
                        Select Difficulty for Next Game:
                    </label>
                    <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        style={{
                            padding: '12px 20px',
                            fontSize: '1.1rem',
                            borderRadius: '8px',
                            backgroundColor: '#333',
                            color: 'white',
                            border: '1px solid #555',
                            width: '100%',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                        <option value="Impossible">Impossible</option>
                    </select>
                </div>

                <button
                    onClick={() => onPlayAgain(selectedDifficulty)}
                    style={{
                        padding: '15px 40px',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        backgroundColor: '#00ff00',
                        color: 'black',
                        border: 'none',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 0, 0.5)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.3)';
                    }}
                >
                    Play Again
                </button>
            </div>
        </div>
    );
};

export default GameOverModal;
