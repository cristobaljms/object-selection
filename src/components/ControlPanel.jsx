import React from 'react';

const ControlPanel = ({
    difficulty, setDifficulty,
    gameState, score, timeLeft, onStart
}) => {
    return (
        <div style={{
            position: 'absolute',
            top: 20,
            left: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            padding: '20px',
            borderRadius: '12px',
            color: 'white',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            border: '1px solid rgba(255,255,255,0.2)',
            fontFamily: 'system-ui, sans-serif',
            minWidth: '200px'
        }}>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>
                {gameState === 'idle' && 'Object Selection'}
                {gameState === 'playing' && 'Playing...'}
                {gameState === 'finished' && 'Game Over'}
            </h2>

            {gameState === 'idle' && (
                <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label>Difficulty: {difficulty}</label>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            style={{
                                padding: '5px',
                                borderRadius: '4px',
                                background: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.3)'
                            }}
                        >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                            <option value="Impossible">Impossible</option>
                        </select>
                    </div>
                    <button
                        onClick={onStart}
                        style={{
                            padding: '10px',
                            borderRadius: '6px',
                            background: '#00ff00',
                            color: 'black',
                            border: 'none',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            marginTop: '10px'
                        }}
                    >
                        Start Game
                    </button>
                </>
            )}

            {gameState === 'playing' && (
                <>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        Time: {timeLeft}s
                    </div>
                    <div style={{ fontSize: '1.5rem', color: '#00ff00' }}>
                        Score: {score}
                    </div>
                </>
            )}

            {gameState === 'finished' && (
                <div style={{ fontSize: '1.2rem', color: '#aaa' }}>
                    Game Finished
                </div>
            )}
        </div>
    );
};

export default ControlPanel;
