// TennisCourt.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import CourtLines from './CourtLines';
import Scoreboard from './Scoreboard';
import Player from './Player';
import Net from './Net';
import GameControls from './GameControls';

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

const TennisCourt = ({ playerAScore, playerBScore, onPlayerAScore, onPlayerBScore }) => {
  const [ballPosition, setBallPosition] = useState({ x: 300, y: 150 });

  const moveBall = () => {
    // Ball movement logic
  };

  return (
    <CourtContainer>
      <CourtLines />
      <TennisBall style={{ left: ballPosition.x, top: ballPosition.y }} />
      <Scoreboard playerAScore={playerAScore} playerBScore={playerBScore} />
      <Player name="Player A" position="left" />
      <Player name="Player B" position="right" />
      <Net />
      <GameControls 
        onStart={() => moveBall()} 
        onPause={() => console.log('Game paused')} 
        onRestart={() => console.log('Game restarted')} 
      />
    </CourtContainer>
  );
};

export default TennisCourt;
