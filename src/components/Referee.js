import React from 'react';
import styled from 'styled-components';

const RefereeContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  color: white;
`;

const Referee = ({ score, gameStatus }) => {
  return (
    <RefereeContainer>
      <div>Score: {score}</div>
      <div>Status: {gameStatus}</div>
      {/* Add additional information as needed */}
    </RefereeContainer>
  );
};

export default Referee;
