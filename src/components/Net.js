// Net.js
import React from 'react';
import styled from 'styled-components';

const NetContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NetTop = styled.div`
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: white;
`;

const NetMesh = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 1px;
  height: 100%;
  background-color: white;
  transform: translateX(-50%);
`;

const Net = () => {
  return (
    <NetContainer>
      <NetTop />
      {[...Array(10)].map((_, index) => (
        <NetMesh key={index} style={{ top: `${index * 10}%` }} />
      ))}
    </NetContainer>
  );
};

export default Net;
