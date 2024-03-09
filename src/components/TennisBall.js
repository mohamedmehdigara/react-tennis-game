import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

// Keyframe animation for bouncing ball
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

// Styled component for the tennis ball
const StyledTennisBall = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: ${({ color }) => color || 'yellow'}; // Changed default color to yellow for visibility
  border-radius: 50%;
  animation: ${({ animated }) => animated ? css`${bounceAnimation} 0.5s ease infinite` : 'none'};
  left: ${({ position }) => position.x}px;
  top: ${({ position }) => position.y}px;
`;

const TennisBall = ({ initialPosition, color = 'yellow', animated = true }) => {
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prevPosition => ({
        x: prevPosition.x + 1,
        y: prevPosition.y - 1, // Adjusted for a more realistic bounce
      }));
    }, 50); // Slowed down for visibility

    return () => clearInterval(interval);
  }, []);

  return <StyledTennisBall position={position} color={color} animated={animated} />;
};

export default TennisBall;
