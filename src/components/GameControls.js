// GameControls.js
import React from 'react';
import styled from 'styled-components';

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

const GameControls = () => {
  return (
    <ControlsContainer>
      <Button>Start</Button>
      <Button>Pause</Button>
      <Button>Restart</Button>
      <Button>Increase Speed</Button>
      <Button>Decrease Speed</Button>
    </ControlsContainer>
  );
};

export default GameControls;
