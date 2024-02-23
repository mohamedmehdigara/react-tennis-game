// App.js
import React, { useState } from 'react';
import styled from 'styled-components';
import TennisCourt from './components/TennisCourt';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const App = () => {
  const [playerAScore, setPlayerAScore] = useState(0);
  const [playerBScore, setPlayerBScore] = useState(0);

  const handlePlayerAScore = () => {
    setPlayerAScore(prevScore => prevScore + 1);
  };

  const handlePlayerBScore = () => {
    setPlayerBScore(prevScore => prevScore + 1);
  };

  return (
    <Container>
      <TennisCourt 
        playerAScore={playerAScore} 
        playerBScore={playerBScore} 
        onPlayerAScore={handlePlayerAScore} 
        onPlayerBScore={handlePlayerBScore} 
      />
    </Container>
  );
};

export default App;
