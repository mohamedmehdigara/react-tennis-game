// Player.js
import React from 'react';
import styled from 'styled-components';

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
  background-color: black;
  border-radius: 50%;
`;

const Player = ({ name, position, top }) => {
  return (
    <PlayerContainer position={position} top={top}>
      <PlayerName>{name}</PlayerName>
      <RacketIcon />
    </PlayerContainer>
  );
};

export default Player;
