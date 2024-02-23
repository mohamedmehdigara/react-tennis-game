// Player.js
import React from 'react';
import styled from 'styled-components';

const PlayerContainer = styled.div`
  position: absolute;
  width: 20px;
  height: 80px;
  background-color: white;
  /* Additional styling for visual enhancements */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: black;
  border: 2px solid black; /* Adding border for better visibility */
  border-radius: 5px; /* Rounded corners for a more polished look */
`;

const Player = ({ name, position }) => {
  return (
    <PlayerContainer style={{ [position]: '10px' }}>
      {name}
    </PlayerContainer>
  );
};

export default Player;
