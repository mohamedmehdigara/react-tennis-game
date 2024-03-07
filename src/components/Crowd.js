import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define keyframe animation for spectator movement
const swayAnimation = keyframes`
  0% {
    transform: translateY(-2px);
  }
  50% {
    transform: translateY(2px);
  }
  100% {
    transform: translateY(-2px);
  }
`;

// Styled component for individual spectator
const Spectator = styled.div`
  width: 10px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  position: absolute;
  animation: ${swayAnimation} 2s ease infinite alternate; // Apply sway animation
`;

// Styled component for crowd container
const CrowdContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
`;



const Crowd = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 600"
      width="100%"
      height="100%"
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      {/* Spectator 1 - Standing */}
      <circle cx="100" cy="300" r="10" fill="rgba(255, 255, 255, 0.5)" />
      {/* Spectator 2 - Sitting */}
      <rect x="200" y="280" width="20" height="20" fill="rgba(255, 255, 255, 0.5)" />
      {/* Spectator 3 - Cheering */}
      <g transform="translate(300, 300)">
        <circle cx="0" cy="0" r="10" fill="rgba(255, 255, 255, 0.5)" />
        <path d="M0 0 L 10 -20 Q 0 -30 -10 -20 Z" fill="rgba(255, 255, 255, 0.5)" />
      </g>
      {/* Spectator 4 - Standing */}
      <circle cx="400" cy="300" r="10" fill="rgba(255, 255, 255, 0.5)" />
      {/* Spectator 5 - Sitting */}
      <rect x="500" y="280" width="20" height="20" fill="rgba(255, 255, 255, 0.5)" />
      {/* Spectator 6 - Cheering */}
      <g transform="translate(600, 300)">
        <circle cx="0" cy="0" r="10" fill="rgba(255, 255, 255, 0.5)" />
        <path d="M0 0 L 10 -20 Q 0 -30 -10 -20 Z" fill="rgba(255, 255, 255, 0.5)" />
      </g>
      {/* Add more spectators as needed */}
    </svg>
  );
};

export default Crowd;
