import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const RacketContainer = styled.div`
  position: absolute;
  left: 20px;
  top: ${({ topPosition }) => topPosition}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RacketFrame = styled.div`
  width: 10px;
  height: 60px;
  background: #f1f1f1;
  position: relative;
`;

const HandleGrip = styled.div`
  width: 4px;
  height: 20px;
  background: #666;
  position: absolute;
  bottom: -10px;
`;

const LeftRacket = ({ gamePaused }) => {
  const [positionY, setPositionY] = useState(window.innerHeight / 2 - 30);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!gamePaused) {
        if (event.key === 'a' || event.key === 'A') {
          setPositionY((prevPosition) => Math.max(0, prevPosition - 10)); // Move up
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gamePaused]);

  return (
    <RacketContainer id="left-racket" topPosition={positionY}>
      <RacketFrame>
        <HandleGrip />
      </RacketFrame>
    </RacketContainer>
  );
};

export default LeftRacket;
