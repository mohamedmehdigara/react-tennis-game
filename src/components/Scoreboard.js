// Scoreboard.js
import React from 'react';
import styled from 'styled-components';

const ScoreboardContainer = styled.div`
  background-color: #f4f4f4;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ScoreRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ScoreLabel = styled.div`
  font-weight: bold;
`;

const ScoreValue = styled.div`
  color: #333;
`;

const Scoreboard = ({ playerAScore, playerBScore, setScore }) => {
  return (
    <ScoreboardContainer>
      <ScoreRow>
        <ScoreLabel>Player A Score:</ScoreLabel>
        <ScoreValue>{playerAScore}</ScoreValue>
      </ScoreRow>
      <ScoreRow>
        <ScoreLabel>Player B Score:</ScoreLabel>
        <ScoreValue>{playerBScore}</ScoreValue>
      </ScoreRow>
    </ScoreboardContainer>
  );
};

export default Scoreboard;
