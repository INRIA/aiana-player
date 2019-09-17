import React from 'react';
import classNames from 'classnames';
import { unitToRatio } from '../../utils/math';
import styled from '../../utils/styled-components';

interface IProps {
  currentTime: number;
  duration: number;
  isSeeking: boolean;
}

const Div = styled.div`
  height: 0.375em;
  width: 100%;
  position: absolute;
  top: calc(50% - 0.1875em);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.1s linear;
  background-color: ${(props) => props.theme.main};
  pointer-events: none;

  &.no-transition {
    transition: none;
  }
`;

function ElapsedTime(props: IProps) {
  const progressRatio = unitToRatio(props.currentTime, props.duration);

  return (
    <Div
      className={classNames('aip-progress__elapsed', {
        'no-transition': props.isSeeking
      })}
      style={{
        transform: `scaleX(${progressRatio})`
      }}
    />
  );
}

export default ElapsedTime;
