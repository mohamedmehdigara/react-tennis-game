import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

// Keyframe animation for bouncing ball
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

// Styled component for the tennis ball
const StyledTennisBall = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: ${({ color }) => color || 'white'}; // Dynamically set ball color
  border-radius: 50%;
  animation: ${({ animated }) => animated && `${bounceAnimation} 0.5s ease infinite`}; // Dynamic animation
`;

// Improved TennisBall component with dynamic animation and position
const TennisBall = ({ initialPosition, color = 'white', animated = true }) => {
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    // Add game logic for updating ball position and handling collisions
    const interval = setInterval(() => {
      // Example: Update ball position based on velocity or game state
      setPosition(prevPosition => ({
        x: prevPosition.x + 1, // Example: Update x-coordinate
        y: prevPosition.y + 1, // Example: Update y-coordinate
      }));
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return <StyledTennisBall style={{ left: position.x, top: position.y }} color={color} animated={animated} />;
};

export default TennisBall;
