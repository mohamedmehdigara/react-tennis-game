// TennisCourt.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

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

const Net = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 200px;
  background-color: white;
`;

const CourtLines = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid white;
  box-sizing: border-box;
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
  const [playerAPosition, setPlayerAPosition] = useState(50);
  const [playerBPosition, setPlayerBPosition] = useState(50);
  const [isPlayerAServing, setIsPlayerAServing] = useState(true);

  // Function to move the ball
  const moveBall = () => {
    // Determine direction based on serving player
    const direction = isPlayerAServing ? 1 : -1;
    // Move ball horizontally
    setBallPosition(prevPos => ({ ...prevPos, x: prevPos.x + direction * 5 }));
    // Move ball vertically (simple bouncing)
    if (ballPosition.y <= 0 || ballPosition.y >= 280) {
      setBallPosition(prevPos => ({ ...prevPos, y: prevPos.y - 10 }));
    }
  };

  // Function to handle player movement
  const handlePlayerMove = (player, direction) => {
    if (player === 'A') {
      setPlayerAPosition(prevPosition => Math.max(0, Math.min(100, prevPosition + direction * 5)));
    } else if (player === 'B') {
      setPlayerBPosition(prevPosition => Math.max(0, Math.min(100, prevPosition + direction * 5)));
    }
  };

  // Function to handle player serving
  const handleServe = () => {
    setIsPlayerAServing(prevState => !prevState);
  };

  return (
    <CourtContainer>
      <CourtLines />
      <Net />
      <TennisBall style={{ left: ballPosition.x, top: ballPosition.y }} />
      <Player style={{ left: '20px', top: `${playerAPosition}%` }} />
      <Player style={{ right: '20px', top: `${playerBPosition}%` }} />
      <Score style={{ left: '10px' }}>Player A: {playerAScore}</Score>
      <Score style={{ right: '10px' }}>Player B: {playerBScore}</Score>
      <Button position="left" onClick={onPlayerAScore}>Player A Score</Button>
      <Button position="right" onClick={onPlayerBScore}>Player B Score</Button>
      <Button position="left" onClick={() => handlePlayerMove('A', -1)}>Move A Up</Button>
      <Button position="left" onClick={() => handlePlayerMove('A', 1)}>Move A Down</Button>
      <Button position="right" onClick={() => handlePlayerMove('B', -1)}>Move B Up</Button>
      <Button position="right" onClick={() => handlePlayerMove('B', 1)}>Move B Down</Button>
      <Button position="left" onClick={handleServe}>Serve</Button>
      <GameStatus>{isPlayerAServing ? 'Player A Serving' : 'Player B Serving'}</GameStatus>
    </CourtContainer>
  );
};

export default TennisCourt;
