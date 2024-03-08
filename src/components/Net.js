import React from 'react';
import styled from 'styled-components';

// Styled components for the net container and mesh
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
  position: relative;

  /* Add net texture */
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background: repeating-linear-gradient(
      90deg,
      transparent,
      transparent 1px,
      rgba(255, 255, 255, 0.5) 1px,
      rgba(255, 255, 255, 0.5) 2px
    );
    top: 50%;
    transform: translateY(-50%);
  }
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
