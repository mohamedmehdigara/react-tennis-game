// SpectatorStand.js

import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframe animation for spectator wave effect
const waveAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

// Container for the spectator stand
const StandContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px; /* Adjust the height as needed */
  background-color: #fff; /* Color of the spectator stand */
`;

// Spectator styled component
const Spectator = styled.div`
  position: absolute;
  width: 10px;
  height: 20px;
  background: ${({ color }) => color};
  animation: ${waveAnimation} ${({ duration }) => duration}s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay}s;
`;

// Function to generate a random color for the spectators
const getRandomColor = () => {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']; // Add more color options for variety
  return colors[Math.floor(Math.random() * colors.length)];
};

// Function to generate a random delay for the animation
const getRandomDelay = () => {
  return Math.random() * 2; // Random delay up to 2 seconds
};

const SpectatorStand = ({ spectatorCount = 50 }) => {
  return (
    <StandContainer>
      {Array.from({ length: spectatorCount }).map((_, index) => (
        <Spectator
          key={index}
          color={getRandomColor()}
          duration={0.75 + Math.random() * 0.5} // Varied duration between 0.75s and 1.25s
          delay={getRandomDelay()}
        />
      ))}
    </StandContainer>
  );
};

export default SpectatorStand;
