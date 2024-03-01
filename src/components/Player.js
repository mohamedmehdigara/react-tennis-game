import React from 'react';
import styled from 'styled-components';

const PlayerContainer = styled.div`
  position: absolute;
  width: 20px;
  height: 80px;
  /* Apply customizable background color */
  background-color: ${props => props.bgColor || 'white'};
  /* Additional styling for visual enhancements */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  /* Apply customizable text color */
  color: ${props => props.textColor || 'black'};
  /* Apply customizable border color */
  border: 2px solid ${props => props.borderColor || 'black'};
  border-radius: 5px;
  /* Apply transition for smooth position changes */
  transition: top 0.5s ease-in-out;
  /* Add cursor pointer for interaction */
  cursor: pointer;
`;

const Player = ({ name, position, bgColor, textColor, borderColor, top, onClick }) => {
  return (
    <PlayerContainer
      bgColor={bgColor}
      textColor={textColor}
      borderColor={borderColor}
      style={{ [position]: '10px', top: `${top}px` }}
      onClick={onClick} // Handle click event
    >
      {name}
    </PlayerContainer>
  );
};

export default Player;
