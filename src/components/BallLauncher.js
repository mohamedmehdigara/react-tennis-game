// BallLauncher.js

import React from 'react';
import styled from 'styled-components';

const LaunchButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const BallLauncher = ({ onLaunch }) => {
  const handleLaunch = () => {
    onLaunch(); // Call the callback function to launch the ball
  };

  return (
    <LaunchButton onClick={handleLaunch}>Launch Ball</LaunchButton>
  );
};

export default BallLauncher;
