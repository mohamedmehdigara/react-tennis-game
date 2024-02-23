// TennisCourt.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import CourtLines from './CourtLines';
import Net from './Net';
import Scoreboard from './Scoreboard';

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

const Player = styled.div`
  position: absolute;
  width: 20px;
  height: 80px;
  background-color: white;
`;

const Score = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  color: white;
`;

const Button = styled.button`
  position: absolute;
  bottom: 20px;
  left: ${props => props.position === 'left' ? '20px' : 'auto'};
  right: ${props => props.position === 'right' ? '20px' : 'auto'};
  padding: 10px 20px;
  font-size: 18px;
`;

const GameStatus = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  color: white;
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
      <Player style={{ left: '20px', top: '50%' }} />
      <Player style={{ right: '20px', top: '50%' }} />
      <Net />
      <Scoreboard>Score: 0-0</Scoreboard>
      {/* Player components, Score display, Buttons, and GameStatus */}
    </CourtContainer>
  );
};

export default TennisCourt;
