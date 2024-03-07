import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import CourtLines from './CourtLines';
import Scoreboard from './Scoreboard';
import Player from './Player';
import Net from './Net';
import GameControls from './GameControls';
import LeftRacket from './LeftRacket';
import RightRacket from './RightRacket';
import Crowd from './Crowd';

// Define bounce animation keyframes
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

// Styled components
const TennisCourtContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const CourtContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
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
// Main component
const TennisCourt = () => {
  // State variables
  const [ballPosition, setBallPosition] = useState({ x: 300, y: 150 });
  const [ballSpeed, setBallSpeed] = useState({ dx: -1, dy: -1 });
  const [playerAScore, setPlayerAScore] = useState(0);
  const [playerBScore, setPlayerBScore] = useState(0);
  const [leftRacketY, setLeftRacketY] = useState(120);
  const [rightRacketY, setRightRacketY] = useState(120);

  // Function to move the ball and handle collisions
  useEffect(() => {
    const moveBall = () => {
      let newX = ballPosition.x + ballSpeed.dx;
      let newY = ballPosition.y + ballSpeed.dy;

      // Collision detection with top and bottom boundaries
      if (newY <= 0 || newY >= 280) {
        setBallSpeed(prevSpeed => ({ ...prevSpeed, dy: -prevSpeed.dy }));
        newY = Math.max(0, Math.min(newY, 280)); // Keep the ball within boundaries
      }

      // Collision detection with left racket
      if (newX <= 60 && newY >= leftRacketY && newY <= leftRacketY + 60) {
        setBallSpeed(prevSpeed => ({ dx: -prevSpeed.dx, dy: prevSpeed.dy }));
        newX = Math.max(60, newX); // Ensure the ball stays outside the racket
      }

      // Collision detection with right racket
      if (newX >= 540 && newY >= rightRacketY && newY <= rightRacketY + 60) {
        setBallSpeed(prevSpeed => ({ dx: -prevSpeed.dx, dy: prevSpeed.dy }));
        newX = Math.min(540, newX); // Ensure the ball stays outside the racket
      }

      // Scoring logic
      if (newX <= 0) {
        setPlayerBScore(prevScore => prevScore + 1);
        resetBall();
      } else if (newX >= 600) {
        setPlayerAScore(prevScore => prevScore + 1);
        resetBall();
      } else {
        setBallPosition({ x: newX, y: newY });
      }
    };

    // Move the ball every 10 milliseconds
    const interval = setInterval(moveBall, 10);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [ballPosition, ballSpeed, leftRacketY, rightRacketY]);

  // Function to reset the ball position
  const resetBall = () => {
    setBallPosition({ x: 300, y: 150 });
    setBallSpeed({ dx: -1, dy: -1 }); // Reset ball direction
  };

  // Function to handle player movement using keyboard input
  const handleKeyDown = (e) => {
    // Player A controls (Left racket)
    if (e.key === 'ArrowLeft') {
      setLeftRacketY(prevY => Math.max(0, prevY - 5)); // Move up
    } else if (e.key === 'ArrowRight') {
      setLeftRacketY(prevY => Math.min(240, prevY + 5)); // Move down
    }
    // Player B controls (Right racket)
    if (e.key === 'w') {
      setRightRacketY(prevY => Math.max(0, prevY - 5)); // Move up
    } else if (e.key === 's') {
      setRightRacketY(prevY => Math.min(240, prevY + 5)); // Move down
    }
  };

  // Add event listener for keyboard input
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Render the component
  return (
    <TennisCourtContainer>
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
          onStart={() => setBallSpeed({ dx: -1, dy: -1 })} // Serve from left player
          onPause={() => setBallSpeed({ dx: 0, dy: 0 })} // Pause the game
          onRestart={() => {
            // Reset ball and scores...
          }}
        />
      </CourtContainer>
      <Crowd /> {/* Add the crowd component */}
    </TennisCourtContainer>
  );
};

export default TennisCourt;
