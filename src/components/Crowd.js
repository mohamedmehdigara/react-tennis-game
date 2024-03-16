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

// Keyframe animation for spectator bobbing effect
const bobbingAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
`;

// Container for the crowd
const CrowdContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
  background: #666;
  overflow: hidden; // Prevents overflow during animation
`;

// Spectator styled component
const Spectator = styled.div`
  display: inline-block;
  width: ${({ size }) => size}px; // Dynamically adjust spectator size
  height: ${({ size }) => size}px; // Dynamically adjust spectator size
  background: ${({ color }) => color};
  margin: 0 2px;
  animation: ${waveAnimation} ${({ duration }) => duration}s ease-in-out infinite,
             ${bobbingAnimation} ${({ duration }) => duration * 2}s ease-in-out infinite; // Add bobbing animation
  animation-delay: ${({ delay }) => delay}s;
`;

// Function to generate a random color for the spectators
const getRandomColor = () => {
  const colors = ['#fff', '#eee', '#ddd', '#ccc', '#bbb']; // Add more color options for variety
  return colors[Math.floor(Math.random() * colors.length)];
};

const Crowd = () => {
  // Calculate spectator count based on window width with a minimum of 50 spectators
  const spectatorCount = Math.max(Math.floor(window.innerWidth / 10), 50);

  return (
    <CrowdContainer aria-label="animated crowd">
      {Array.from({ length: spectatorCount }).map((_, index) => (
        <Spectator
          key={index}
          color={getRandomColor()}
          size={10 + Math.random() * 10} // Randomize spectator size
          duration={0.75 + Math.random() * 0.5} // Varied duration between 0.75s and 1.25s
          delay={Math.random() * 2} // Random delay up to 2s
          aria-hidden="true" // Hide individual spectators from screen readers for accessibility
        />
      ))}
    </CrowdContainer>
  );
};

export default Crowd;
