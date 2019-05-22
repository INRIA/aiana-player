import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from '../../utils/styled-components';
import AssistiveText from '../a11y/AssistiveText';
import { uid } from '../../utils/ui';

interface IProgressColors {
  done: string;
  inProgress: string;
  todo: string;
}

const StyledElement = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;

    .progress-border {
      fill: #111;
    }

    .progress-current {
      fill: #fff;
      stroke: #111;
      stroke-linejoin: butt;
      stroke-dasharray: 0.1, 0.1;
      stroke-width: 0.03;
    }
  }
`;

function progressColor(
  progress: number,
  thresholdMin: number,
  thresholdMax: number,
  colors: IProgressColors = {
    done: '#4c7a34',
    inProgress: '#cbe8ba',
    todo: '#d6d6d6'
  }
): string {
  if (progress >= thresholdMax) {
    return colors.done;
  }

  if (progress < thresholdMin) {
    return colors.todo;
  }

  return colors.inProgress;
}

function TimeSpent() {
  const [t] = useTranslation();
  const graphLabelId = `progress-${uid()}`;
  const progress = 41;

  return (
    <StyledElement>
      <svg viewBox="-1 -1 2 2" aria-labelledby={graphLabelId}>
        <g>
          <g>
            <path
              d="M 0 -1 A 1 1 0 0 1 1 0 L 0 0 Z"
              className="progress-border"
            />
            <path
              d="M 0.01 -0.99 A 1 1 0 0 1 0.99 -0.01 L 0.01 -0.01 Z"
              fill={progressColor(progress, 0, 25)}
              transform="scale(0.99)"
            />
          </g>
          <g>
            <path
              d="M 1 0 A 1 1 0 0 1 0 1 L 0 0 Z"
              className="progress-border"
            />
            <path
              d="M 0.99 0.01 A 1 1 0 0 1 0.01 0.99 L 0.01 0.01 Z"
              fill={progressColor(progress, 25, 50)}
              transform="scale(0.99)"
            />
          </g>
          <g>
            <path
              d="M 0 1 A 1 1 0 0 1 -1 0 L 0 0 Z"
              className="progress-border"
            />
            <path
              d="M -0.01 0.99 A 1 1 0 0 1 -0.99 0.01 L -0.01 0.01 Z"
              fill={progressColor(progress, 50, 75)}
              transform="scale(0.99)"
            />
          </g>
          <g>
            <path
              d="M -1 0 A 1 1 0 0 1 0 -1 L 0 0 Z"
              className="progress-border"
            />
            <path
              d="M -0.99 -0.01 A 1 1 0 0 1 -0.01 -0.99 L -0.01 -0.01 Z"
              fill={progressColor(progress, 75, 100)}
              transform="scale(0.99)"
            />
          </g>
        </g>
        <g className="progress-current">
          <path
            d="M 1 0 A 1 1 0 0 1 -0.866025403784439 0.5 L 0 0 Z"
            transform="rotate(-90) scale(0.8)"
          />
        </g>
      </svg>

      <AssistiveText id={graphLabelId}>
        {t('progression.sequence_progress', { progress })}
      </AssistiveText>
    </StyledElement>
  );
}

export default TimeSpent;
