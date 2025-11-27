import React, { useState } from 'react';

const StartGameModal = ({ onStart, initialDifficulty }) => {
    const [activeTab, setActiveTab] = useState('play'); // 'play' or 'rules'
    const [difficulty, setDifficulty] = useState(initialDifficulty || 'Medium');

    const handleStart = () => {
        onStart(difficulty);
    };

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
                padding: '30px',
                borderRadius: '20px',
                textAlign: 'center',
                border: '1px solid #333',
                boxShadow: '0 0 50px rgba(0, 255, 0, 0.1)',
                minWidth: '400px',
                maxWidth: '90%',
                color: 'white',
                fontFamily: 'system-ui, sans-serif'
            }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    marginBottom: '20px',
                    background: 'linear-gradient(45deg, #00ff00, #00ffff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Object Selection
                </h1>

                {/* Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', borderBottom: '1px solid #333' }}>
                    <button
                        onClick={() => setActiveTab('play')}
                        style={{
                            padding: '10px 20px',
                            background: 'none',
                            border: 'none',
                            color: activeTab === 'play' ? '#00ff00' : '#888',
                            borderBottom: activeTab === 'play' ? '2px solid #00ff00' : '2px solid transparent',
                            cursor: 'pointer',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            transition: 'color 0.2s'
                        }}
                    >
                        Play
                    </button>
                    <button
                        onClick={() => setActiveTab('rules')}
                        style={{
                            padding: '10px 20px',
                            background: 'none',
                            border: 'none',
                            color: activeTab === 'rules' ? '#00ff00' : '#888',
                            borderBottom: activeTab === 'rules' ? '2px solid #00ff00' : '2px solid transparent',
                            cursor: 'pointer',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            transition: 'color 0.2s'
                        }}
                    >
                        Rules
                    </button>
                </div>

                {/* Play Tab Content */}
                {activeTab === 'play' && (
                    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                        <div style={{ marginBottom: '30px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', color: '#ccc' }}>
                                Select Difficulty:
                            </label>
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
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
                            onClick={handleStart}
                            style={{
                                padding: '15px 50px',
                                fontSize: '1.3rem',
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
                            Start Game
                        </button>
                    </div>
                )}

                {/* Rules Tab Content */}
                {activeTab === 'rules' && (
                    <div style={{
                        textAlign: 'left',
                        padding: '0 20px',
                        animation: 'fadeIn 0.3s ease-out',
                        maxHeight: '300px',
                        overflowY: 'auto'
                    }}>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                                <span style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'white', display: 'inline-block', marginRight: '15px' }}></span>
                                <div>
                                    <div style={{ fontWeight: 'bold', color: 'white' }}>White Ball</div>
                                    <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Click to get <span style={{ color: '#00ff00' }}>+1 Point</span></div>
                                </div>
                            </li>
                            <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                                <span style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'red', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px' }}>💣</span>
                                <div>
                                    <div style={{ fontWeight: 'bold', color: '#ff4444' }}>Bomb Ball</div>
                                    <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Avoid! <span style={{ color: '#ff4444' }}>-3 Points</span></div>
                                </div>
                            </li>
                            <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                                <span style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'blue', display: 'inline-block', marginRight: '15px' }}></span>
                                <div>
                                    <div style={{ fontWeight: 'bold', color: '#4444ff' }}>Bonus Ball</div>
                                    <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Appears briefly. <span style={{ color: '#00ffff' }}>+5 Points</span></div>
                                </div>
                            </li>
                            <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                                <span style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'red', display: 'inline-block', marginRight: '15px' }}></span>
                                <div>
                                    <div style={{ fontWeight: 'bold', color: '#ff4444' }}>Blocked Ball</div>
                                    <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Don't click red balls. <span style={{ color: '#ff4444' }}>-1 Point</span></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default StartGameModal;
