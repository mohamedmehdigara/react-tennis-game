import React, { useState } from 'react';
import styled from 'styled-components';
import CourtLines from './CourtLines';
import Scoreboard from './Scoreboard';
import Player from './Player';
import Net from './Net';
import GameControls from './GameControls';
import LeftRacket from './LeftRacket';
import RightRacket from './RightRacket';
import Crowd from './Crowd';
import Referee from './Referee';
import Timer from './Timer';

const CourtContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #4c9a2a; /* Adjust background color as needed */
`;

const TennisCourt = () => {
  const [gamePaused, setGamePaused] = useState(true);

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
      <Crowd />
      <CourtLines />
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
      <Referee />
      <Timer />
    </CourtContainer>
  );
};

export default TennisCourt;
