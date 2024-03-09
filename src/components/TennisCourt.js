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

const CourtContainer = styled.div`
  position: relative;
  width: 100vw; // Adjusted to viewport width for full-width experience
  height: 100vh; // Adjusted to viewport height for full-height experience
  background-color: #4c9a2a;
`;

const TennisCourt = () => {
  const initialBallPosition = { x: 50, y: 50 }; // Adjusted for a starting position

  return (
    <CourtContainer>
      <Crowd />
      <CourtLines />
      <TennisBall initialPosition={initialBallPosition} />
      <Scoreboard />
      <Player name="Player A" position="left" />
      <Player name="Player B" position="right" />
      <Net />
      <LeftRacket />
      <RightRacket />
      <GameControls />
    </CourtContainer>
  );
};

export default TennisCourt;
