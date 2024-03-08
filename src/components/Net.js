// Net.js
import React from 'react';
import styled from 'styled-components';

const NetContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NetMesh = styled.div`
  width: 2px;
  height: 20px;
  background-color: #ffffff;
  margin-bottom: 5px;
`;

const Net = () => {
  return (
    <NetContainer>
      {[...Array(10)].map((_, index) => (
        <NetMesh key={index} />
      ))}
    </NetContainer>
  );
};

export default Net;
