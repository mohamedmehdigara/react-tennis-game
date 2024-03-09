import React from 'react';
import styled, { css } from 'styled-components';

// Assuming a full court width of 100%, calculate line positions and widths based on standard tennis court dimensions
const CourtLinesContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

// General line styling with hover effect removed for non-interactive elements
const Line = styled.div`
  position: absolute;
  background-color: ${({ color }) => color || 'white'};
  ${({ thickness }) => thickness && `height: ${thickness};`}
`;

// Base component for vertical lines (center, singles, doubles sidelines)
const VerticalLine = styled(Line)`
  width: ${({ thickness }) => thickness || '2px'};
  height: 100%;
`;

// Base component for horizontal lines (baseline, service line)
const HorizontalLine = styled(Line)`
  width: 100%;
  height: ${({ thickness }) => thickness || '2px'};
`;

const Baseline = styled(HorizontalLine)``;

const ServiceLine = styled(HorizontalLine)`
  bottom: 25%; /* Adjust according to actual court proportions */
`;

const CenterLine = styled(VerticalLine)`
  left: 50%;
  transform: translateX(-50%);
`;

const SinglesSideline = styled(VerticalLine)`
  left: ${({ isRight }) => (isRight ? 'calc(100% - 2px)' : '0')};
`;

const DoublesSideline = styled(VerticalLine)`
  left: ${({ isRight }) => (isRight ? 'calc(100% - 4.5%)' : '4.5%')}; /* Adjust sideline spacing */
`;

const CenterServiceLine = styled(HorizontalLine)`
  top: 50%;
  height: 2px;
  width: 50%;
  left: 25%; /* Adjust to center the line */
`;

const Net = styled(VerticalLine)`
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: ${({ thickness }) => thickness || '2px'};
  width: 100%;
`;

const CourtLines = ({ courtColor = 'white', lineThickness = '2px' }) => {
  return (
    <CourtLinesContainer>
      <Baseline color={courtColor} thickness={lineThickness} />
      <ServiceLine color={courtColor} thickness={lineThickness} />
      <CenterLine color={courtColor} thickness={lineThickness} />
      <SinglesSideline color={courtColor} thickness={lineThickness} />
      <SinglesSideline color={courtColor} thickness={lineThickness} isRight />
      <DoublesSideline color={courtColor} thickness={lineThickness} />
      <DoublesSideline color={courtColor} thickness={lineThickness} isRight />
      <CenterServiceLine color={courtColor} thickness={lineThickness} />
      <Net color={courtColor} thickness="5px" /> {/* Net thickness visually distinct */}
    </CourtLinesContainer>
  );
};

export default CourtLines;
