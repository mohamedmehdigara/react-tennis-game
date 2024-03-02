import React from 'react';
import styled from 'styled-components';

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
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
      <Button onClick={onStart}>Start</Button>
      <Button onClick={onPause}>Pause</Button>
      <Button onClick={onRestart}>Restart</Button>
      <Button onClick={onIncreaseSpeed}>Increase Speed</Button>
      <Button onClick={onDecreaseSpeed}>Decrease Speed</Button>
    </ControlsContainer>
  );
};

export default GameControls;
