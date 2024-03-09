import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const RacketContainer = styled.div`
  position: absolute;
  left: ${({ leftPosition }) => leftPosition}px;
  top: ${({ topPosition }) => topPosition}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RacketFrame = styled.div`
  width: 10px;
  height: 60px;
  border: 2px solid #000;
  border-radius: 5px;
  background: #f1f1f1;
  position: relative;
`;

const HandleGrip = styled.div`
  width: 4px;
  height: 20px;
  background: #666;
  position: absolute;
  bottom: -10px;
`;

const LeftRacket = ({ topPosition, moveStep, onHit }) => {
  const [position, setPosition] = useState(topPosition);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp' || event.key === 'w') {
        moveRacket(-moveStep);
      } else if (event.key === 'ArrowDown' || event.key === 's') {
        moveRacket(moveStep);
      } else if (event.key === 'a' || event.key === 'A') {
        hitBall();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [moveStep]);

  const moveRacket = (step) => {
    const containerHeight = containerRef.current.clientHeight;
    const newPosition = Math.max(0, Math.min(position + step, containerHeight - 60));
    setPosition(newPosition);
  };

  const hitBall = () => {
    const ball = document.getElementById('tennis-ball');
    const ballRect = ball.getBoundingClientRect();
    const racketRect = containerRef.current.getBoundingClientRect();

    if (
      ballRect.left <= racketRect.right &&
      ballRect.right >= racketRect.left &&
      ballRect.top <= racketRect.bottom &&
      ballRect.bottom >= racketRect.top
    ) {
      onHit(); // Notify parent component that the ball was hit
    }
  };

  return (
    <RacketContainer topPosition={position} ref={containerRef}>
      <RacketFrame>
        <HandleGrip />
      </RacketFrame>
    </RacketContainer>
  );
};

export default LeftRacket;
