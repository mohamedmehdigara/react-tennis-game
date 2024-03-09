import React from 'react';
import styled, { keyframes } from 'styled-components';

const waveAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const CrowdContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
  background: #666;
`;

const Spectator = styled.div`
  display: inline-block;
  width: 5px;
  height: 20px;
  background: #fff;
  margin: 0 2px;
  animation: ${waveAnimation} 1s ease-in-out infinite;
`;

const Crowd = () => (
  <CrowdContainer>
    {Array.from({ length: 100 }).map((_, index) => (
      <Spectator key={index} style={{ animationDelay: `${Math.random() * 2}s` }} />
    ))}
  </CrowdContainer>
);

export default Crowd;
