import React from 'react';
import styled from 'styled-components';

// Styled components for the racket container, frame, handle grip, and strings
const RacketContainer = styled.div`
  position: absolute;
  left: 0;
  top: ${({ topPosition }) => topPosition}px;
`;

const RacketFrame = styled.div`
  width: 10px;
  height: 60px;
  border: 2px solid #000;
  border-radius: 5px;
  background: #f1f1f1;
  position: relative;
`;

const HandleGrip = styled.div`
  width: 4px;
  height: 20px;
  background: #666;
  position: absolute;
  top: 50%;
  left: -6px;
  transform: translateY(-50%);
  z-index: 1;
`;

const String = styled.div`
  position: absolute;
  top: ${({ top }) => top}px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 20px;
  background: #c0c0c0;
`;

const LeftRacket = ({ topPosition }) => {
  return (
    <RacketContainer topPosition={topPosition}>
      <RacketFrame>
        {/* Handle Grip */}
        <HandleGrip />
        {/* Strings */}
        <String top={10} />
        <String top={30} />
        <String top={50} />
      </RacketFrame>
    </RacketContainer>
  );
};

export default LeftRacket;

