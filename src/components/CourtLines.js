// CourtLines.js
import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const CourtLinesContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

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
      animation: ${bounceAnimation} 0.5s ease infinite;
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

// New lines to represent additional markings on the tennis court
const ServiceBoxLine = styled(Line)`
  position: absolute;
  left: calc(50% - 22ft);
  bottom: 50%;
  width: 44ft;
  height: 2px;
`;

const SinglesSidelineExtended = styled(Line)`
  top: 0;
  left: 0;
  height: 100%;
  width: 2px;
`;

const DoublesSidelineExtended = styled(Line)`
  top: 0;
  left: calc(50% - 21ft);
  height: 100%;
  width: 2px;
`;

const AlleyLine = styled(Line)`
  top: 0;
  left: calc(50% - 33ft);
  height: 100%;
  width: 2px;
`;

const TLine = styled(Line)`
  top: 0;
  left: calc(50% - 1px);
  height: 20px;
  width: 2px;
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

      {/* Additional lines */}
      <ServiceBoxLine color={courtColor} animated={animated} />
      <SinglesSidelineExtended color={courtColor} animated={animated} />
      <DoublesSidelineExtended color={courtColor} animated={animated} />
      <AlleyLine color={courtColor} animated={animated} />
      <TLine color={courtColor} animated={animated} />
    </CourtLinesContainer>
  );
};

export default CourtLines;
