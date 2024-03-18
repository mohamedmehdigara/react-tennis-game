import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Racket = styled.div`
  position: absolute;
  width: 10px;
  height: 60px;
  background-color: #0000ff; /* Adjust racket color */
  left: 10px; /* Adjust left position as needed */
  bottom: ${({ position }) => position}px;
`;

const LeftRacket = ({ onHit, gamePaused }) => {
  const [position, setPosition] = useState(50); // Initial position

  useEffect(() => {
    const handleKeyPress = (event) => {
      if ((event.key === 'a' || event.key === 'A') && !gamePaused) {
        onHit(); // Trigger hit action when A is pressed and game is not paused
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onHit, gamePaused]);

  return <Racket position={position} />;
};

export default LeftRacket;
