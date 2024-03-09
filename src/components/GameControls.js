import React from 'react';
import styled from 'styled-components';
import { FaPlay, FaPause, FaRedo, FaArrowUp, FaArrowDown } from 'react-icons/fa';

// Styled components for the controls container and buttons
const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const GameControls = ({ onStart, onPause, onRestart, onIncreaseSpeed, onDecreaseSpeed }) => {
  return (
    <ControlsContainer>
      {/* Start Button */}
      <Button onClick={onStart} title="Start">
        <FaPlay /> Start
      </Button>
      {/* Pause Button */}
      <Button onClick={onPause} title="Pause">
        <FaPause /> Pause
      </Button>
      {/* Restart Button */}
      <Button onClick={onRestart} title="Restart">
        <FaRedo /> Restart
      </Button>
      {/* Increase Speed Button */}
      <Button onClick={onIncreaseSpeed} title="Increase Speed">
        <FaArrowUp /> Increase Speed
      </Button>
      {/* Decrease Speed Button */}
      <Button onClick={onDecreaseSpeed} title="Decrease Speed">
        <FaArrowDown /> Decrease Speed
      </Button>
    </ControlsContainer>
  );
};

export default GameControls;
