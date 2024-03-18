import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Racket = styled.div`
  position: absolute;
  width: 10px;
  height: 60px;
  background-color: #0000ff; /* Adjust racket color */
  right: 10px; /* Adjust right position as needed */
  bottom: ${({ position }) => position}px;
`;

const RightRacket = ({ onHit, gamePaused }) => {
  const [position, setPosition] = useState(50); // Initial position

  useEffect(() => {
    const handleKeyPress = (event) => {
      if ((event.key === 'p' || event.key === 'P') && !gamePaused) {
        onHit(); // Trigger hit action when P is pressed and game is not paused
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onHit, gamePaused]);

  return <Racket position={position} />;
};

export default RightRacket;
