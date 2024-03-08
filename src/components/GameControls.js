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
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #45a049;
  }
`;

// Icon styled component to customize icons
const Icon = styled.span`
  margin-right: 5px;
`;

const GameControls = ({ onStart, onPause, onRestart, onIncreaseSpeed, onDecreaseSpeed }) => {
  return (
    <ControlsContainer>
      {/* Start Button */}
      <Button onClick={onStart} title="Start">
        <Icon><FaPlay /></Icon> Start
      </Button>
      {/* Pause Button */}
      <Button onClick={onPause} title="Pause">
        <Icon><FaPause /></Icon> Pause
      </Button>
      {/* Restart Button */}
      <Button onClick={onRestart} title="Restart">
        <Icon><FaRedo /></Icon> Restart
      </Button>
      {/* Increase Speed Button */}
      <Button onClick={onIncreaseSpeed} title="Increase Speed">
        <Icon><FaArrowUp /></Icon> Increase Speed
      </Button>
      {/* Decrease Speed Button */}
      <Button onClick={onDecreaseSpeed} title="Decrease Speed">
        <Icon><FaArrowDown /></Icon> Decrease Speed
      </Button>
    </ControlsContainer>
  );
};

export default GameControls;
