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

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const GameControls = ({ onStart, onPause, onRestart, onSetDuration, duration }) => {
  return (
    <ControlsContainer>
      <Button onClick={onStart}>Start</Button>
      <Button onClick={onPause}>Pause</Button>
      <Button onClick={onRestart}>Restart</Button>
      <label>Set Duration:</label>
      <Input 
        type="number" 
        min="1" 
        max="60" 
        value={duration} 
        onChange={(e) => onSetDuration(parseInt(e.target.value))} 
      />
    </ControlsContainer>
  );
};

export default GameControls;
