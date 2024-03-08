import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CourtLines from './CourtLines';
import Scoreboard from './Scoreboard';
import Player from './Player';
import Net from './Net';
import GameControls from './GameControls';
import LeftRacket from './LeftRacket';
import RightRacket from './RightRacket';
import TennisBall from './TennisBall';

const CourtContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: green;
`;

const TennisCourt = () => {
  // Define initial ball position and speed
  const initialBallPosition = { x: 300, y: 150 };
  const initialBallSpeed = { dx: 1, dy: 1 };

  // State variables for ball position and speed
  const [ballPosition, setBallPosition] = useState(initialBallPosition);
  const [ballSpeed, setBallSpeed] = useState(initialBallSpeed);

  // Function to update ball position and handle collisions
  useEffect(() => {
    const interval = setInterval(() => {
      // Update ball position based on speed
      setBallPosition(prevPosition => ({
        x: prevPosition.x + ballSpeed.dx,
        y: prevPosition.y + ballSpeed.dy,
      }));

      // Example collision detection with court boundaries
      if (ballPosition.x <= 0 || ballPosition.x >= 600) {
        setBallSpeed(prevSpeed => ({ ...prevSpeed, dx: -prevSpeed.dx }));
      }
      if (ballPosition.y <= 0 || ballPosition.y >= 300) {
        setBallSpeed(prevSpeed => ({ ...prevSpeed, dy: -prevSpeed.dy }));
      }

      // Example collision detection with player rackets
      // Add logic to check collision with left and right rackets

    }, 10);

    return () => clearInterval(interval);
  }, [ballPosition, ballSpeed]);

  return (
    <CourtContainer>
      <CourtLines />
      <TennisBall initialPosition={initialBallPosition} />
      <Scoreboard />
      <Player name="Player A" position="left" />
      <Player name="Player B" position="right" />
      <Net />
      <LeftRacket />
      <RightRacket />
      <GameControls />
    </CourtContainer>
  );
};

export default TennisCourt;
