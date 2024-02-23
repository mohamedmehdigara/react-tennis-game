// CourtLines.js
import React from 'react';
import styled from 'styled-components';

const CourtLinesContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Baseline = styled.div`
  /* Styles for baseline */
`;

const ServiceLine = styled.div`
  /* Styles for service line */
`;

const CenterLine = styled.div`
  /* Styles for center line */
`;

const SinglesSideline = styled.div`
  /* Styles for singles sideline */
`;

const DoublesSideline = styled.div`
  /* Styles for doubles sideline */
`;

const CenterServiceLine = styled.div`
  /* Styles for center service line */
`;

const Net = styled.div`
  /* Styles for net */
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
