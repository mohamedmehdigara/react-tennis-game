import React from 'react';
import styled from 'styled-components';

// Container for all court lines
const CourtLinesContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

// Base styled component for lines
const Line = styled.div`
  position: absolute;
  background-color: ${({ color }) => color || 'white'};
  ${({ thickness }) => thickness && `height: ${thickness};`}
`;

// Styled components for vertical lines
const VerticalLine = styled(Line)`
  width: ${({ thickness }) => thickness || '2px'};
  height: 100%;
`;

// Styled components for horizontal lines
const HorizontalLine = styled(Line)`
  width: 100%;
  height: ${({ thickness }) => thickness || '2px'};
`;

// Baseline
const Baseline = styled(HorizontalLine)``;

// Service line
const ServiceLine = styled(HorizontalLine)`
  bottom: 25%;
`;

// Center line
const CenterLine = styled(VerticalLine)`
  left: 50%;
  transform: translateX(-50%);
`;

// Singles sideline
const SinglesSideline = styled(VerticalLine)`
  left: ${({ isRight }) => (isRight ? 'calc(100% - 2px)' : '0')};
`;

// Doubles sideline
const DoublesSideline = styled(VerticalLine)`
  left: ${({ isRight }) => (isRight ? 'calc(100% - 4.5%)' : '4.5%')};
`;

// Center service line
const CenterServiceLine = styled(HorizontalLine)`
  top: 50%;
  height: 2px;
  width: 50%;
  left: 25%;
`;

// Net
const Net = styled(VerticalLine)`
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: ${({ thickness }) => thickness || '2px'};
  width: 100%;
`;

// Additional lines
const ServiceBoxLine = styled(HorizontalLine)`
  bottom: 62.5%; /* Adjust based on actual court proportions */
`;

const AlleyLine = styled(VerticalLine)`
  left: calc(50% - 10.67%);
`;

const TLine = styled(VerticalLine)`
  left: calc(50% - 0.67%);
`;

// CourtLines component
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
      {/* Additional lines */}
      <ServiceBoxLine color={courtColor} thickness={lineThickness} />
      <AlleyLine color={courtColor} thickness={lineThickness} />
      <TLine color={courtColor} thickness={lineThickness} />
    </CourtLinesContainer>
  );
};

export default CourtLines;
