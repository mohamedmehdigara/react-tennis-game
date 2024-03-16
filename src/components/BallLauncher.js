// BallLauncher.js

import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounceAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
`;

const LaunchButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #45a049;
    animation: ${bounceAnimation} 0.5s ease infinite;
  }
`;

const BallIcon = styled.span`
  margin-right: 5px;
`;

const BallLauncher = ({ onLaunch }) => {
  const handleLaunch = () => {
    onLaunch(); // Call the callback function to launch the ball
  };

  return (
    <LaunchButton onClick={handleLaunch}>
      <BallIcon role="img" aria-label="ball">🎾</BallIcon> Launch Ball
    </LaunchButton>
  );
};

export default BallLauncher;
