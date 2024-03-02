import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import CourtLines from './CourtLines';
import Scoreboard from './Scoreboard';
import Player from './Player';
import Net from './Net';
import GameControls from './GameControls';
import LeftRacket from './LeftRacket';
import RightRacket from './RightRacket';

const bounceAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px);
  }
  100% {
    transform: translateY(0);
  }
`;

const CourtContainer = styled.div`
  position: relative;
  width: 600px;
  height: 300px;
  background-color: green;
`;

const TennisBall = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  animation: ${bounceAnimation} 0.5s ease infinite;
`;

const TennisCourt = () => {
  const [ballPosition, setBallPosition] = useState({ x: 300, y: 150 });
  const [ballSpeed, setBallSpeed] = useState({ dx: 1, dy: 1 });
  const [playerAScore, setPlayerAScore] = useState(0);
  const [playerBScore, setPlayerBScore] = useState(0);
  const [leftRacketY, setLeftRacketY] = useState(120);
  const [rightRacketY, setRightRacketY] = useState(120);

  useEffect(() => {
    const moveBall = () => {
      // Get current ball position
      let newX = ballPosition.x + ballSpeed.dx;
      let newY = ballPosition.y + ballSpeed.dy;
  
      // Check collision with top and bottom boundaries
      if (newY <= 0 || newY >= 280) {
        setBallSpeed(prevSpeed => ({ ...prevSpeed, dy: -prevSpeed.dy }));
        newY = Math.max(0, Math.min(newY, 280)); // Ensure the ball stays within boundaries
      }

      // Check collision with left racket
      if (newX <= 60 && newY >= leftRacketY && newY <= leftRacketY + 60) {
        setBallSpeed(prevSpeed => ({ dx: -prevSpeed.dx, dy: prevSpeed.dy }));
        newX = Math.max(60, newX); // Ensure the ball stays outside the racket
      }

      // Check collision with right racket
      if (newX >= 540 && newY >= rightRacketY && newY <= rightRacketY + 60) {
        setBallSpeed(prevSpeed => ({ dx: -prevSpeed.dx, dy: prevSpeed.dy }));
        newX = Math.min(540, newX); // Ensure the ball stays outside the racket
      }
  
      // Check if ball goes out of bounds on the left or right side
      if (newX <= 0) {
        setPlayerBScore(prevScore => prevScore + 1);
        setBallPosition({ x: 300, y: 150 }); // Reset ball position
        setBallSpeed({ dx: -1, dy: 1 }); // Serve from player B
      } else if (newX >= 600) {
        setPlayerAScore(prevScore => prevScore + 1);
        setBallPosition({ x: 300, y: 150 }); // Reset ball position
        setBallSpeed({ dx: 1, dy: 1 }); // Serve from player A
      } else {
        // Update ball position
        setBallPosition({ x: newX, y: newY });
      }
    };
  
    const interval = setInterval(moveBall, 10); // Move ball every 10 milliseconds
  
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [ballPosition, ballSpeed, leftRacketY, rightRacketY]);

  const handleKeyDown = (e) => {
    // Player A controls
    if (e.key === 'w') {
      setLeftRacketY(prevY => Math.max(0, prevY - 5)); // Move up
    } else if (e.key === 's') {
      setLeftRacketY(prevY => Math.min(240, prevY + 5)); // Move down
    }
    // Player B controls
    if (e.key === 'ArrowUp') {
      setRightRacketY(prevY => Math.max(0, prevY - 5)); // Move up
    } else if (e.key === 'ArrowDown') {
      setRightRacketY(prevY => Math.min(240, prevY + 5)); // Move down
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <CourtContainer>
      <CourtLines />
      <TennisBall style={{ left: ballPosition.x, top: ballPosition.y }} />
      <Scoreboard playerAScore={playerAScore} playerBScore={playerBScore} />
      <Player name="Player A" position="left" bgColor="blue" textColor="white" borderColor="red" top={leftRacketY} />
      <Player name="Player B" position="right" bgColor="green" textColor="black" borderColor="yellow" top={rightRacketY} />
      <Net />
      <LeftRacket topPosition={leftRacketY} />
      <RightRacket topPosition={rightRacketY} />
      <GameControls 
        onStart={() => setBallSpeed({ dx: 1, dy: 1 })} 
        onPause={() => setBallSpeed({ dx: 0, dy: 0 })} 
        onRestart={() => {
          setBallPosition({ x: 300, y: 150 });
          setPlayerAScore(0);
          setPlayerBScore(0);
        }}
      />
    </CourtContainer>
  );
};

export default TennisCourt;
