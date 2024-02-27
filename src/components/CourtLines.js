// CourtLines.js
import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const CourtLinesContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const baselineAnimation = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;

const Line = styled.div`
  position: absolute;
  background-color: ${({ color }) => color || 'white'};
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }

  ${({ animated }) =>
    animated &&
    css`
      animation: ${baselineAnimation} 0.5s ease forwards;
    `}
`;

const Baseline = styled(Line)`
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
`;

const ServiceLine = styled(Line)`
  bottom: 50%;
  left: 0;
  width: 100%;
  height: 2px;
`;

const CenterLine = styled(Line)`
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
`;

const SinglesSideline = styled(Line)`
  top: 0;
  left: 0;
  height: 100%;
  width: 2px;
`;

const DoublesSideline = styled(Line)`
  top: 0;
  left: calc(50% - 11ft);
  height: 100%;
  width: 2px;
`;

const CenterServiceLine = styled(Line)`
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 40px;
`;

const Net = styled(Line)`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 200px;
`;

const CourtLines = ({ courtColor, animated }) => {
  return (
    <CourtLinesContainer>
      <Baseline color={courtColor} animated={animated} />
      <ServiceLine color={courtColor} animated={animated} />
      <CenterLine color={courtColor} animated={animated} />
      <SinglesSideline color={courtColor} animated={animated} />
      <DoublesSideline color={courtColor} animated={animated} />
      <CenterServiceLine color={courtColor} animated={animated} />
      <Net color={courtColor} animated={animated} />
    </CourtLinesContainer>
  );
};

export default CourtLines;
