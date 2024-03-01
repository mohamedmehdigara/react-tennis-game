// TennisCourt.js
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

const TennisCourt = ({ playerAScore, playerBScore }) => {
  const [ballPosition, setBallPosition] = useState({ x: 300, y: 150 });
  const [ballSpeed, setBallSpeed] = useState({ dx: 1, dy: 1 });

  useEffect(() => {
    const moveBall = () => {
      // Get current ball position
      let newX = ballPosition.x + ballSpeed.dx;
      let newY = ballPosition.y + ballSpeed.dy;
  
      // Adjust ball position if it hits the top or bottom boundaries
      if (newY <= 0 || newY >= 280) {
        setBallSpeed(prevSpeed => ({ ...prevSpeed, dy: -prevSpeed.dy }));
        newY = Math.max(0, Math.min(newY, 280)); // Ensure the ball stays within boundaries
      }
  
      // Check collision with left racket
      const leftRacketY = 120; // Y position of the top of the left racket
      const leftRacketX = 50; // X position of the left racket
      if (newX <= leftRacketX + 10 && newY >= leftRacketY && newY <= leftRacketY + 60) {
        setBallSpeed(prevSpeed => ({ dx: -prevSpeed.dx, dy: prevSpeed.dy }));
        newX = Math.max(leftRacketX + 10, newX); // Ensure the ball stays outside the racket
      }
  
      // Check collision with right racket
      const rightRacketY = 120; // Y position of the top of the right racket
      const rightRacketX = 540; // X position of the right racket
      if (newX >= rightRacketX - 10 && newY >= rightRacketY && newY <= rightRacketY + 60) {
        setBallSpeed(prevSpeed => ({ dx: -prevSpeed.dx, dy: prevSpeed.dy }));
        newX = Math.min(rightRacketX - 10, newX); // Ensure the ball stays outside the racket
      }
  
      // Update ball position
      setBallPosition({ x: newX, y: newY });
    };
  
    const interval = setInterval(moveBall, 10); // Move ball every 10 milliseconds
  
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [ballPosition, ballSpeed]);
  

  return (
    <CourtContainer>
      <CourtLines />
      <TennisBall style={{ left: ballPosition.x, top: ballPosition.y }} />
      <Scoreboard playerAScore={playerAScore} playerBScore={playerBScore} />
      <Player name="Player A" position="left" bgColor="blue" textColor="white" borderColor="red" />
<Player name="Player B" position="right" bgColor="green" textColor="black" borderColor="yellow" />

      <Net />
      <LeftRacket position={50} topPosition={120} width={10} height={60} />
      <RightRacket position={50} topPosition={120} width={10} height={60} />
      <GameControls 
        onStart={() => setBallSpeed({ dx: 1, dy: 1 })} 
        onPause={() => setBallSpeed({ dx: 0, dy: 0 })} 
        onRestart={() => setBallPosition({ x: 300, y: 150 })}
      />
    </CourtContainer>
  );
};

export default TennisCourt;
