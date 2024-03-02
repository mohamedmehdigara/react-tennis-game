import React from 'react';
import styled from 'styled-components';

const RacketContainer = styled.div`
  position: absolute;
  right: ${({ position }) => position}px;
  top: ${({ topPosition }) => topPosition}px;
`;

const RacketFrame = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border: 2px solid #000;
  border-radius: 10px;
  background: #f1f1f1;
  position: relative;
`;

const HandleGrip = styled.div`
  width: 20px;
  height: ${({ height }) => height}px;
  background: #666;
  position: absolute;
  top: 50%;
  right: ${({ right }) => right}px;
  transform: translateY(-50%);
  z-index: 1;
`;

const String = styled.div`
  position: absolute;
  top: ${({ top }) => top}px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 40px;
  background: #c0c0c0;
`;

const RightRacket = ({ position, topPosition, width, height }) => {
  return (
    <RacketContainer position={position} topPosition={topPosition}>
      <RacketFrame width={width} height={height}>
        <HandleGrip height={height * 0.2} right={width / 2 - 10} />
        <String top={height * 0.2 + 10} />
        <String top={height * 0.5} />
        <String top={height * 0.8 - 10} />
      </RacketFrame>
    </RacketContainer>
  );
};

export default RightRacket;
