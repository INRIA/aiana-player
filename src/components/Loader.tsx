import React from 'react';
import AssistiveText from './a11y/AssistiveText';
import styled from '../utils/styled-components';

const P = styled.p`
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;

  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .aip-loader-icon {
    display: block;
    width: 50px;
    height: 50px;

    animation: flip 2s ease infinite;
    background-color: ${(props) => props.theme.main};

    transform: background-color;
  }

  @keyframes flip {
    0% {
      transform: perspective(120px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }
    33% {
      transform: perspective(120px) rotateX(180deg) rotateY(0deg) rotateZ(0deg);
    }
    66% {
      transform: perspective(120px) rotateX(180deg) rotateY(0deg)
        rotateZ(180deg);
    }
    100% {
      transform: perspective(120px) rotateX(180deg) rotateY(180deg)
        rotateZ(180deg);
    }
  }
`;

function Loader() {
  return (
    <P role="alert" aria-live="assertive">
      <span className="aip-loader-icon" aria-hidden="true">
        <span />
        <span />
      </span>
      <AssistiveText>Media player is loading.</AssistiveText>
    </P>
  );
}

export default Loader;
