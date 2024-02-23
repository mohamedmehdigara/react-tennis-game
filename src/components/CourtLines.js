// CourtLines.js
import React from 'react';
import styled from 'styled-components';

const CourtLinesContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Baseline = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: white;
`;

const ServiceLine = styled.div`
  position: absolute;
  bottom: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: white;
`;

const CenterLine = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background-color: white;
`;

const SinglesSideline = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 2px;
  background-color: white;
`;

const DoublesSideline = styled.div`
  position: absolute;
  top: 0;
  left: calc(50% - 11ft);
  height: 100%;
  width: 2px;
  background-color: white;
`;

const CenterServiceLine = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 40px;
  background-color: white;
`;

const Net = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 200px;
  background-color: white;
`;

const CourtLines = () => {
  return (
    <CourtLinesContainer>
      <Baseline />
      <ServiceLine />
      <CenterLine />
      <SinglesSideline />
      <DoublesSideline />
      <CenterServiceLine />
      <Net />
    </CourtLinesContainer>
  );
};

export default CourtLines;
