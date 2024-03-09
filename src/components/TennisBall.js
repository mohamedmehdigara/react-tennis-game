import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const bounceAnimation = css`
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

const StyledTennisBall = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: ${({ color }) => color || 'white'}; // Dynamically set ball color
  border-radius: 50%;
  animation: ${({ animated }) => animated && `${bounceAnimation} 0.5s ease infinite`}; // Dynamic animation
`;

const TennisBall = ({ initialPosition, color = 'white', animated = true }) => {
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update ball position based on game logic
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return <StyledTennisBall id="tennis-ball" style={{ left: position.x, top: position.y }} color={color} animated={animated} />;
};

export default TennisBall;
