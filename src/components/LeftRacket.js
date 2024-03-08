// LeftRacket.js
import React from 'react';
import styled from 'styled-components';

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
`;

const LeftRacket = ({ topPosition }) => {
  return (
    <RacketContainer topPosition={topPosition}>
      <RacketFrame />
    </RacketContainer>
  );
};

export default LeftRacket;
