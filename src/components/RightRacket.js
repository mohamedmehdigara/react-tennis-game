import React from 'react';
import styled, { css } from 'styled-components';

// Styled components for the racket container and frame
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

// Improved RightRacket component with dynamic styling
const RightRacket = ({ topPosition, racketColor }) => {
  return (
    <RacketContainer topPosition={topPosition}>
      <RacketFrame style={{ backgroundColor: racketColor }} />
    </RacketContainer>
  );
};

export default RightRacket;
