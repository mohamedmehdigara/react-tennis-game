// Scoreboard.js
import React from 'react';
import styled from 'styled-components';

const ScoreboardContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
`;

const Score = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Scoreboard = ({ playerAScore, playerBScore }) => {
  return (
    <ScoreboardContainer>
      <Score>Player A: {playerAScore}</Score>
      <Score>Player B: {playerBScore}</Score>
    </ScoreboardContainer>
  );
};

export default Scoreboard;
