import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const swayAnimation = keyframes`
  0% {
    transform: rotate(-1deg);
  }
  50% {
    transform: rotate(1deg);
  }
  100% {
    transform: rotate(-1deg);
  }
`;

const NetContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  width: 100%;
  height: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${swayAnimation} 4s ease infinite alternate;
`;

const NetTop = styled.div`
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, #ffffff, #bbbbbb);
`;

const NetMesh = styled.div`
  position: absolute;
  top: 0;
  left: calc(50% - 1px);
  width: 2px;
  height: 100%;
  background-color: #ffffff;
`;

const NetPole = styled.div`
  position: absolute;
  top: -5px;
  left: 50%;
  width: 6px;
  height: 6px;
  background-color: #ffffff;
  border-radius: 50%;
  transform: translateX(-50%);
`;

const Net = ({ height, meshCount }) => {
  const [netHeight, setNetHeight] = useState(height);

  const handleHeightChange = (event) => {
    const newHeight = parseInt(event.target.value);
    setNetHeight(newHeight);
  };

  return (
    <NetContainer style={{ height: `${netHeight}px` }}>
      <NetTop />
      {[...Array(meshCount)].map((_, index) => (
        <NetMesh key={index} style={{ top: `${(index / meshCount) * 100}%` }} />
      ))}
      <NetPole />
      {/* Interactive Element: Adjustable Height */}
      <input type="range" min="100" max="200" value={netHeight} onChange={handleHeightChange} />
    </NetContainer>
  );
};

export default Net;
