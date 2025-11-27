import React, { useRef, useEffect, useState } from 'react';

const GameCanvas = ({ ballCount, ballSize, ballSpeed, isPlaying, onScore }) => {
  const containerRef = useRef(null);
  const requestRef = useRef();
  const [balls, setBalls] = useState([]);
  const [selectedBallId, setSelectedBallId] = useState(null);
  const [floatingTexts, setFloatingTexts] = useState([]);
  // Ref to track selectedBallId inside the animation loop without dependencies
  const selectedBallIdRef = useRef(selectedBallId);

  // Sync ref with state
  useEffect(() => {
    selectedBallIdRef.current = selectedBallId;
  }, [selectedBallId]);

  // Initialize balls
  useEffect(() => {
    const width = containerRef.current ? containerRef.current.clientWidth : window.innerWidth;
    const height = containerRef.current ? containerRef.current.clientHeight : window.innerHeight;

    const createBall = (id, type) => ({
      id,
      type, // 'normal' or 'bomb'
      x: Math.random() * (width - ballSize),
      y: Math.random() * (height - ballSize),
      vx: (Math.random() - 0.5) * ballSpeed,
      vy: (Math.random() - 0.5) * ballSpeed,
      blockedUntil: 0,
      bonusUntil: 0,
    });

    const normalBalls = Array.from({ length: ballCount }).map((_, i) => createBall(i, 'normal'));
    const bombBalls = Array.from({ length: 10 }).map((_, i) => createBall(ballCount + i, 'bomb'));

    setBalls([...normalBalls, ...bombBalls]);
    setSelectedBallId(null);
    setFloatingTexts([]);
  }, [ballCount, ballSize, ballSpeed, isPlaying]);

  // Bonus Ball Logic
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      // 10% chance to activate bonus
      if (Math.random() < 0.1) {
        setBalls(prevBalls => {
          // Find available normal balls (not blocked, not already bonus, not selected)
          const availableBalls = prevBalls.filter(b =>
            b.type === 'normal' &&
            b.blockedUntil <= Date.now() &&
            b.bonusUntil <= Date.now() &&
            b.id !== selectedBallIdRef.current
          );

          if (availableBalls.length === 0) return prevBalls;

          const randomBall = availableBalls[Math.floor(Math.random() * availableBalls.length)];
          const bonusUntil = Date.now() + 2000; // 2 seconds

          return prevBalls.map(b =>
            b.id === randomBall.id ? { ...b, bonusUntil } : b
          );
        });
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [isPlaying]);

  const addFloatingText = (x, y, text, color) => {
    const id = Date.now() + Math.random();
    setFloatingTexts(prev => [...prev, { id, x, y, text, color }]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(ft => ft.id !== id));
    }, 1000); // Remove after 1s
  };

  const handleBallClick = (ballId) => {
    if (!isPlaying) return;

    const ball = balls.find(b => b.id === ballId);
    if (!ball) return;

    // Bomb Logic
    if (ball.type === 'bomb') {
      onScore(-3);
      addFloatingText(ball.x + ballSize / 2, ball.y, '-3', 'red');
      return;
    }

    // Blocked Logic
    if (Date.now() < ball.blockedUntil) {
      onScore(-1);
      addFloatingText(ball.x + ballSize / 2, ball.y, '-1', 'red');
      return;
    }

    // Bonus Logic
    if (Date.now() < ball.bonusUntil) {
      onScore(5);
      addFloatingText(ball.x + ballSize / 2, ball.y, '+5', '#00ffff');
      // Reset bonus immediately after click? Or let it expire? 
      // Usually bonus is consumed.
      setBalls(prev => prev.map(b => b.id === ballId ? { ...b, bonusUntil: 0 } : b));
      return;
    }

    // If already selected (Green) -> Ignore
    if (selectedBallId === ballId) return;

    // Random chance to block (e.g., 30%)
    const shouldBlock = Math.random() < 0.3;

    if (shouldBlock) {
      const blockDuration = 3000;
      const blockedUntil = Date.now() + blockDuration;

      setBalls(prevBalls => prevBalls.map(b => {
        if (b.id === ballId) {
          return { ...b, blockedUntil };
        }
        return b;
      }));
      onScore(1);
      addFloatingText(ball.x + ballSize / 2, ball.y, '+1', '#00ff00');

    } else {
      // Normal selection
      setSelectedBallId(ballId);
      onScore(1);
      addFloatingText(ball.x + ballSize / 2, ball.y, '+1', '#00ff00');
    }
  };

  // Game Loop
  useEffect(() => {
    const animate = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      const now = Date.now();

      // If not playing, don't move balls, but keep rendering for visuals
      if (!isPlaying) {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }

      let shouldDeselectId = null;

      setBalls(prevBalls => {
        const nextBalls = prevBalls.map(ball => {
          if (ball.blockedUntil > 0 && now >= ball.blockedUntil) {
            if (selectedBallIdRef.current === ball.id) {
              shouldDeselectId = ball.id;
            }
            return { ...ball, blockedUntil: 0 };
          }

          // Move
          let { x, y, vx, vy } = ball;
          x += vx;
          y += vy;

          if (x <= 0 || x + ballSize >= clientWidth) {
            vx = -vx;
            x = Math.max(0, Math.min(x, clientWidth - ballSize));
          }
          if (y <= 0 || y + ballSize >= clientHeight) {
            vy = -vy;
            y = Math.max(0, Math.min(y, clientHeight - ballSize));
          }

          return { ...ball, x, y, vx, vy };
        });

        if (shouldDeselectId !== null) {
          setTimeout(() => {
            if (selectedBallIdRef.current === shouldDeselectId) {
              setSelectedBallId(null);
            }
          }, 0);
        }

        return nextBalls;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [ballSize, ballSpeed, isPlaying]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        overflow: 'hidden'
      }}
    >
      {balls.map(ball => {
        const isBlocked = Date.now() < ball.blockedUntil;
        const isBonus = Date.now() < ball.bonusUntil;
        const isSelected = selectedBallId === ball.id;
        const isBomb = ball.type === 'bomb';

        let color = '#ffffff';
        let content = null;

        if (isBomb) {
          color = '#ff0000';
          content = '💣';
        } else if (isBlocked) {
          color = '#ff0000'; // Blocked also red, but no icon? Or maybe dark red?
          // User said: "bolas rojas con una imagen de una bomba".
          // Blocked balls were red before. Maybe make blocked balls Dark Red or Orange?
          // Or keep them red but without the bomb.
          // Let's keep blocked as red (no icon) and bomb as red (with icon).
        } else if (isBonus) {
          color = '#0000ff'; // Blue
        } else if (isSelected) {
          color = '#00ff00';
        }

        const remainingSeconds = isBlocked
          ? Math.ceil((ball.blockedUntil - Date.now()) / 1000)
          : null;

        return (
          <div
            key={ball.id}
            onClick={() => handleBallClick(ball.id)}
            style={{
              position: 'absolute',
              left: ball.x,
              top: ball.y,
              width: ballSize,
              height: ballSize,
              borderRadius: '50%',
              backgroundColor: color,
              cursor: 'pointer',
              transform: 'translate3d(0,0,0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: `${ballSize / 2}px`,
              userSelect: 'none',
              transition: 'background-color 0.2s'
            }}
          >
            {isBomb ? content : (isBlocked && remainingSeconds)}
          </div>
        );
      })}

      {floatingTexts.map(ft => (
        <div
          key={ft.id}
          style={{
            position: 'absolute',
            left: ft.x,
            top: ft.y,
            color: ft.color,
            fontSize: '2rem',
            fontWeight: 'bold',
            pointerEvents: 'none',
            animation: 'floatUp 1s ease-out forwards',
            zIndex: 100
          }}
        >
          {ft.text}
        </div>
      ))}
    </div>
  );
};

export default GameCanvas;
