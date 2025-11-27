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

            {gameState === 'idle' && null}

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
