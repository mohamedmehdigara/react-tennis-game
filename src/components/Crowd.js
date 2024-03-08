import React from 'react';
import styled from 'styled-components';

// Define keyframe animation for spectator movement
const swayAnimation = styled.keyframes`
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
const Spectator = styled.circle`
  fill: rgba(255, 255, 255, 0.5);
  animation: ${swayAnimation} 2s ease infinite alternate; // Apply sway animation
`;

// Styled component for crowd container
const CrowdContainer = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Crowd = () => {
  return (
    <CrowdContainer
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 600"
    >
      {/* Spectator 1 - Standing */}
      <Spectator cx="100" cy="300" r="10" />
      {/* Spectator 2 - Sitting */}
      <rect x="200" y="280" width="20" height="20" fill="rgba(255, 255, 255, 0.5)" />
      {/* Spectator 3 - Cheering */}
      <g transform="translate(300, 300)">
        <Spectator cx="0" cy="0" r="10" />
        <path d="M0 0 L 10 -20 Q 0 -30 -10 -20 Z" fill="rgba(255, 255, 255, 0.5)" />
      </g>
      {/* Spectator 4 - Standing */}
      <Spectator cx="400" cy="300" r="10" />
      {/* Spectator 5 - Sitting */}
      <rect x="500" y="280" width="20" height="20" fill="rgba(255, 255, 255, 0.5)" />
      {/* Spectator 6 - Cheering */}
      <g transform="translate(600, 300)">
        <Spectator cx="0" cy="0" r="10" />
        <path d="M0 0 L 10 -20 Q 0 -30 -10 -20 Z" fill="rgba(255, 255, 255, 0.5)" />
      </g>
      {/* Add more spectators as needed */}
    </CrowdContainer>
  );
};

export default Crowd;
