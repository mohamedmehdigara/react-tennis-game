// RightRacket.js
import React from 'react';
import styled from 'styled-components';

const RacketContainer = styled.div`
  position: absolute;
  right: 50px; /* Adjust position as needed */
  top: 120px; /* Adjust position as needed */
  width: 10px;
  height: 60px;
  background-color: black;
`;

const RightRacket = () => {
  return (
    <RacketContainer />
  );
};

export default RightRacket;
