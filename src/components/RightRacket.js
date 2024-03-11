import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const RacketContainer = styled.div`
  position: absolute;
  right: 0;
  top: ${({ topPosition }) => topPosition}px;
`;

const RacketFrame = styled.div`
  width: 10px;
  height: 60px;
  border: 2px solid #000;
  border-radius: 5px;
  background: #f1f1f1;
`;

const RightRacket = ({ topPosition, racketColor, onHit }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'a' || event.key === 'A') {
        onHit(); // Call the onHit function when 'A' is pressed
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onHit]);

  return (
    <RacketContainer topPosition={topPosition}>
      <RacketFrame style={{ backgroundColor: racketColor }} />
    </RacketContainer>
  );
};

export default RightRacket;
