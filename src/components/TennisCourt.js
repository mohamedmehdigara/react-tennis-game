import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CourtLines from './CourtLines';
import Scoreboard from './Scoreboard';
import Player from './Player';
import Net from './Net';
import GameControls from './GameControls';
import LeftRacket from './LeftRacket';
import RightRacket from './RightRacket';
import TennisBall from './TennisBall';
import Crowd from './Crowd'; // Ensure this is correctly imported
import Referee from './Referee'; // Import the Referee component


const CourtContainer = styled.div`
  position: relative;
  width: 100vw; // Adjusted to viewport width for full-width experience
  height: 100vh; // Adjusted to viewport height for full-height experience
`;

const TennisCourt = () => {
  const initialBallPosition = { x: 50, y: 50 }; // Adjusted for a starting position
  const [gamePaused, setGamePaused] = useState(true);
  const [score, setScore] = useState('0-0'); // Example initial score
  const [gameStatus, setGameStatus] = useState('In Progress')

  const handleStart = () => {
    setGamePaused(false);
    // Additional logic to start the game
  };

  const handlePause = () => {
    setGamePaused(true);
    // Additional logic to pause the game
  };

  const handleRestart = () => {
    // Additional logic to restart the game
  };

  const handleIncreaseSpeed = () => {
    // Additional logic to increase the ball speed
  };

  const handleDecreaseSpeed = () => {
    // Additional logic to decrease the ball speed
  };

  const handleHit = () => {
    // Handle hit logic here
  };

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
      <TennisBall initialPosition={initialBallPosition} gamePaused={gamePaused} />
      <Scoreboard />
      <Player name="Player A" position="left" />
      <Player name="Player B" position="right" />
      <Net />
      <LeftRacket onHit={handleHit} gamePaused={gamePaused} />
      <RightRacket onHit={handleHit} gamePaused={gamePaused} />
      <GameControls
        onStart={handleStart}
        onPause={handlePause}
        onRestart={handleRestart}
        onIncreaseSpeed={handleIncreaseSpeed}
        onDecreaseSpeed={handleDecreaseSpeed}
      />
            <Referee score={score} gameStatus={gameStatus} />

    </CourtContainer>
  );
};

export default TennisCourt;
