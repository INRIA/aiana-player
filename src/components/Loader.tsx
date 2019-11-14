import React from 'react';
import AssistiveText from './a11y/AssistiveText';
import styled from '../utils/styled-components';

interface IProps {
  text?: string;
}

const P = styled.p`
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;

  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .aip-loader__icon {
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

function Loader({ text }: IProps) {
  return (
    <P className="aip-loader">
      <span className="aip-loader__icon" aria-hidden="true">
        <span />
        <span />
      </span>
      {text && <AssistiveText>{text}</AssistiveText>}
    </P>
  );
}

export default Loader;
