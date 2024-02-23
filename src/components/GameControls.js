// GameControls.js
import React from 'react';
import styled from 'styled-components';

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
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

const GameControls = ({ onStart, onPause, onRestart }) => {
  return (
    <ControlsContainer>
      <Button onClick={onStart}>Start</Button>
      <Button onClick={onPause}>Pause</Button>
      <Button onClick={onRestart}>Restart</Button>
    </ControlsContainer>
  );
};

export default GameControls;
