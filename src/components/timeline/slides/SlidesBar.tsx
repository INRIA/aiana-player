import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { seek } from '../../../actions/player';
import { DEFAULT_LANG } from '../../../constants/preferences';
import { IAianaState } from '../../../reducers';
import { unitToPercent } from '../../../utils/math';
import { IRawTrack } from '../../../utils/media';
import styled from '../../../utils/styled-components';
import SlideButton from './SlideButton';

interface IStateProps {
  duration: number;
  language: string;
  slidesTracks: IRawTrack[];
}

interface IDispatchProps {
  seek(seekingTime: number): void;
}

interface ISlidesBar extends IStateProps, IDispatchProps {}

const StyledSlidesBar = styled.nav`
  width: 100%;
  height: 50%;

  position: absolute;
  left: 0;
  top: 50%;

  ol {
    margin: 0;
    padding: 0;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  li {
    display: block;
    width: 1.125em;
    height: 1.125em;

    line-height: 1;

    position: absolute;
    transform: translateX(-50%);
    list-style: none;

    button {
      width: 100%;
      height: 100%;
    }
  }
`;

function SlidesBar({ slidesTracks, duration, language, seek }: ISlidesBar) {
  const [t] = useTranslation();

  const activeSlidesTrack =
    slidesTracks.find((track) => track.language === language) ||
    slidesTracks.find((track) => track.language === DEFAULT_LANG);

  if (!activeSlidesTrack) {
    return null;
  }

  return (
    <StyledSlidesBar>
      <ol>
        {activeSlidesTrack.cues.map(({ startTime }, idx) => (
          <li
            key={idx}
            style={{
              left: `${unitToPercent(startTime, duration)}%`
            }}
          >
            <SlideButton
              label={t('timeline.goto_and_play_slide', {
                index: idx
              })}
              onClick={seek}
              time={startTime}
            />
          </li>
        ))}
      </ol>
    </StyledSlidesBar>
  );
}

function mapState(state: IAianaState) {
  return {
    duration: state.player.duration,
    language: state.slides.language,
    slidesTracks: state.slides.slidesTracks
  };
}

const mapDispatch = {
  seek
};

export default connect(
  mapState,
  mapDispatch
)(SlidesBar);
