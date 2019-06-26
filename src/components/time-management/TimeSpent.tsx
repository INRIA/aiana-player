import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import withWidget from '../../hocs/with-widget';
import { IAianaState } from '../../reducers';
import { degToRad, unitToPercent, percentageToUnit } from '../../utils/math';
import styled from '../../utils/styled-components';
import { uid } from '../../utils/uniqueId';
import AssistiveText from '../a11y/AssistiveText';

interface IStateProps {
  currentTime: number;
  duration: number;
}

const StyledElement = styled.div`
  height: 100%;
  width: 100%;

  padding: 0.25em;

  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;

    .progress__border {
      fill: #111;
    }

    .progress__slice {
      transition: fill 0.1s;

      &.done {
        fill: #4c7a34;
      }

      &.in-progress {
        fill: #cbe8ba;
      }

      &.todo {
        fill: #d6d6d6;
      }
    }

    .progress__current {
      fill: #fff;
      stroke: #111;
      stroke-linejoin: butt;
      stroke-dasharray: 0.1, 0.1;
      stroke-width: 0.03;
      transition: 0.1s;
    }
  }
`;

const { PI, cos, floor, sin } = Math;

function progressStatusClassName(
  progress: number,
  thresholdMin: number,
  thresholdMax: number
): string | null {
  if (progress >= thresholdMax) {
    return 'done';
  }

  if (progress < thresholdMin) {
    return 'todo';
  }

  return 'in-progress';
}

function TimeSpent({ currentTime, duration }: IStateProps) {
  const [t] = useTranslation();
  const graphLabelId = `progress-${uid()}`;
  const progress = unitToPercent(currentTime, duration);
  const angleDeg = percentageToUnit(progress, 360);
  const angle = degToRad(angleDeg);

  return (
    <StyledElement>
      <svg viewBox="-1 -1 2 2" aria-labelledby={graphLabelId}>
        <g>
          <g>
            <path
              d="M 0 -1 A 1 1 0 0 1 1 0 L 0 0 Z"
              className="progress__border"
            />
            <path
              className={classNames(
                'progress__slice',
                progressStatusClassName(progress, 0, 25)
              )}
              d="M 0.01 -0.99 A 1 1 0 0 1 0.99 -0.01 L 0.01 -0.01 Z"
              transform="scale(0.99)"
            />
          </g>
          <g>
            <path
              d="M 1 0 A 1 1 0 0 1 0 1 L 0 0 Z"
              className="progress__border"
            />
            <path
              className={classNames(
                'progress__slice',
                progressStatusClassName(progress, 25, 50)
              )}
              d="M 0.99 0.01 A 1 1 0 0 1 0.01 0.99 L 0.01 0.01 Z"
              transform="scale(0.99)"
            />
          </g>
          <g>
            <path
              d="M 0 1 A 1 1 0 0 1 -1 0 L 0 0 Z"
              className="progress__border"
            />
            <path
              className={classNames(
                'progress__slice',
                progressStatusClassName(progress, 50, 75)
              )}
              d="M -0.01 0.99 A 1 1 0 0 1 -0.99 0.01 L -0.01 0.01 Z"
              transform="scale(0.99)"
            />
          </g>
          <g>
            <path
              d="M -1 0 A 1 1 0 0 1 0 -1 L 0 0 Z"
              className="progress__border"
            />
            <path
              className={classNames(
                'progress__slice',
                progressStatusClassName(progress, 75, 100)
              )}
              d="M -0.99 -0.01 A 1 1 0 0 1 -0.01 -0.99 L -0.01 -0.01 Z"
              transform="scale(0.99)"
            />
          </g>
        </g>
        {/*
          `large-arc-flag` should be set to `1` when angle is greater than PI.
          If not set, the arc will use the shortest possible path, i.e. `PI - angle`.
        */}
        <path
          className="progress__current"
          d={`M 1 0 A 1 1 0 ${Number(angle > PI)} 1 ${cos(angle)} ${sin(
            angle
          )} L 0 0 Z`}
          transform="rotate(-90) scale(0.8)"
        />
      </svg>

      <AssistiveText id={graphLabelId}>
        {t('progression.sequence_progress', { progress: floor(progress) })}
      </AssistiveText>
    </StyledElement>
  );
}

function mapState(state: IAianaState) {
  return {
    currentTime: state.player.currentTime,
    duration: state.player.duration
  };
}

export default connect(mapState)(withWidget(TimeSpent));
