// LeftRacket.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

const swingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(20deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const RacketContainer = styled.div`
  position: absolute;
  left: ${({ position }) => position}px;
  top: ${({ topPosition }) => topPosition}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${({ animated }) => (animated ? swingAnimation : 'none')} 0.5s ease infinite;
`;

const RacketHead = styled.div`
  position: relative;
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background: #f1f1f1;
`;

const NetPattern = styled.pattern`
  id: net-pattern;
  stroke: #c0c0c0;
  stroke-width: 2;
`;

const Net = styled.line`
  stroke: url(#net-pattern);
  stroke-width: 2;
`;

const Grip = styled.div`
  position: absolute;
  bottom: -10px;
  left: 50%;
  width: 4px;
  height: 100px;
  background: #999;
`;

const LeftRacket = ({ position, topPosition, width, height, animated }) => {
  return (
    <RacketContainer position={position} topPosition={topPosition} width={width} height={height} animated={animated}>
      <RacketHead>
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Net Pattern */}
          <NetPattern id="net-pattern" patternUnits="userSpaceOnUse" width="4" height="4">
            <Net x1="0" y1="0" x2="0" y2="4" />
          </NetPattern>
          {/* Circle */}
          <circle cx="50" cy="50" r="45" fill="#f1f1f1" />
          {/* Net */}
          <rect x="30" y="0" width="2" height="100" fill="url(#net-pattern)" />
          <rect x="40" y="0" width="2" height="100" fill="url(#net-pattern)" />
          <rect x="50" y="0" width="2" height="100" fill="url(#net-pattern)" />
          <rect x="60" y="0" width="2" height="100" fill="url(#net-pattern)" />
          <rect x="70" y="0" width="2" height="100" fill="url(#net-pattern)" />
          {/* Grip */}
          <Grip />
        </svg>
      </RacketHead>
    </RacketContainer>
  );
};

export default LeftRacket;
