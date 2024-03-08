// TennisCourt.js
import React from 'react';
import styled from 'styled-components';
import CourtLines from './CourtLines';
import Scoreboard from './Scoreboard';
import Player from './Player';
import Net from './Net';
import GameControls from './GameControls';
import LeftRacket from './LeftRacket';
import RightRacket from './RightRacket';
import TennisBall from './TennisBall'; // Update import for TennisBall component

const CourtContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: green;
`;

const TennisCourt = () => {
  // Define initial ball position
  const initialBallPosition = { x: 300, y: 150 };

  return (
    <CourtContainer>
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
