// TennisBall.js
import React, { useEffect, useState } from 'react';
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

const TennisBall = ({ initialPosition }) => {
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update ball position here based on game logic
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <StyledTennisBall style={{ left: position.x, top: position.y }} />
  );
};

const StyledTennisBall = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  animation: ${bounceAnimation} 0.5s ease infinite;
`;

export default TennisBall;
