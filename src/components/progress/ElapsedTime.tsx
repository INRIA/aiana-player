import React from 'react';
import { unitToRatio } from '../../utils/math';
import styled from '../../utils/styled-components';

interface IProps {
  currentTime: number;
  duration: number;
}

const Div = styled.div`
  height: 0.375em;
  width: 100%;
  position: absolute;
  top: calc(50% - 0.1875em);
  transform: scaleX(0);
  transform-origin: left;
  background-color: ${(props) => props.theme.main};
  pointer-events: none;
`;

function ElapsedTime(props: IProps) {
  const progressRatio = unitToRatio(props.currentTime, props.duration);

  return (
    <Div
      className="aip-progress__elapsed"
      style={{ transform: `scaleX(${progressRatio})` }}
    />
  );
}

export default ElapsedTime;
