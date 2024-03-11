import React from 'react';
import styled, { css } from 'styled-components';

// Styled components for the player container, name, and racket icon
const PlayerContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  ${({ position }) => (position === 'left' ? 'left: 20px;' : 'right: 20px;')}
  top: ${({ top }) => top}px;
`;

const PlayerName = styled.div`
  font-size: 18px;
  margin-right: 5px;
`;

const RacketIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  ${({ racketColor }) => css`
    background-color: ${racketColor || 'black'};
    border: 2px solid ${racketColor || 'black'};
  `}
`;

const TennisBall = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ ballColor }) => ballColor || 'yellow'}; // Customize ball color
  margin-left: 5px; // Add some spacing between the racket and ball
`;

const Player = ({ name, position, top, racketColor, ballColor }) => {
  return (
    <PlayerContainer position={position} top={top}>
      <PlayerName>{name}</PlayerName>
      <RacketIcon racketColor={racketColor} />
      <TennisBall ballColor={ballColor} />
    </PlayerContainer>
  );
};

export default Player;
