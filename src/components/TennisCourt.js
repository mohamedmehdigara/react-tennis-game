// TennisCourt.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CourtLines from './CourtLines';
import Scoreboard from './Scoreboard';
import Player from './Player';
import Net from './Net';
import GameControls from './GameControls';
import LeftRacket from './LeftRacket';
import RightRacket from './RightRacket';
import Crowd from './Crowd'; // Ensure this is correctly imported
import Referee from './Referee'; // Import the Referee component
import Timer from './Timer';

const CourtContainer = styled.div`
  position: relative;
  width: 100vw; // Adjusted to viewport width for full-width experience
  height: 100vh; // Adjusted to viewport height for full-height experience
`;

const TennisCourt = () => {
  const [gamePaused, setGamePaused] = useState(true);
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 });
  const [leftRacketPosition, setLeftRacketPosition] = useState(50);
  const [rightRacketPosition, setRightRacketPosition] = useState(50);

  useEffect(() => {
    let intervalId;

    if (!gamePaused) {
      intervalId = setInterval(() => {
        const newBallPosition = {
          x: Math.random() * 80, // Adjust x-coordinate range as needed
          y: Math.random() * 80, // Adjust y-coordinate range as needed
        };
        setBallPosition(newBallPosition);
      }, 1000); // Adjust interval time as needed
    }

    return () => clearInterval(intervalId);
  }, [gamePaused]);

  const handleHit = () => {
    // Handle hit logic here
    // For now, just move the ball to a random position
    const newBallPosition = {
      x: Math.random() * 80, // Adjust x-coordinate range as needed
      y: Math.random() * 80, // Adjust y-coordinate range as needed
    };
    setBallPosition(newBallPosition);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'a' || event.key === 'A') {
      // Move left racket up
      setLeftRacketPosition((prevPosition) => Math.max(prevPosition - 5, 0));
    } else if (event.key === 'p' || event.key === 'P') {
      // Move right racket down
      setRightRacketPosition((prevPosition) => Math.min(prevPosition + 5, 100));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <CourtContainer>
      {/* SVG Background Image */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }}
      >
        {/* Define the tennis court background here */}
        <rect x="0" y="0" width="100" height="100" fill="#4c9a2a" />
        {/* Add additional SVG elements to represent the tennis court lines, etc. */}
      </svg>

      <Crowd />
      <CourtLines />
      <Scoreboard />
      <Player name="Player A" position="left" />
      <Player name="Player B" position="right" />
      <Net />
      <LeftRacket position={leftRacketPosition} />
      <RightRacket position={rightRacketPosition} />
      <GameControls onStart={() => setGamePaused(false)} onPause={() => setGamePaused(true)} />
      <Referee />
      <Timer />
      <div style={{ position: 'absolute', left: `${ballPosition.x}%`, top: `${ballPosition.y}%`, background: 'red', width: '10px', height: '10px', borderRadius: '50%' }} />
    </CourtContainer>
  );
};

export default TennisCourt;
