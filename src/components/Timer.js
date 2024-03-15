import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TimerContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 24px;
  color: white;
`;

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const handleReset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <TimerContainer>
      <div>Timer: {seconds}s</div>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button onClick={handleReset}>Reset</button>
    </TimerContainer>
  );
};

export default Timer;
