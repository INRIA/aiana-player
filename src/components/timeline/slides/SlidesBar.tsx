import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { requestSeek } from '../../../actions/player';
import { DEFAULT_LANG } from '../../../constants';
import { IAianaState } from '../../../reducers';
import { unitToPercent } from '../../../utils/math';
import { IRawSlidesTrack } from '../../../utils/media';
import styled from '../../../utils/styled-components';
import SlideButton from './SlideButton';

interface IStateProps {
  duration: number;
  language: string;
  media?: HTMLMediaElement;
  slidesTracks: IRawSlidesTrack[];
}

interface IDispatchProps {
  requestSeek: any;
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

function SlidesBar({
  slidesTracks,
  duration,
  language,
  media,
  requestSeek: requestSeekAction
}: ISlidesBar) {
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
              media={media}
              onClick={requestSeekAction}
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
    media: state.player.mediaElement,
    slidesTracks: state.slides.slidesTracks
  };
}

const mapDispatch = {
  requestSeek
};

export default connect(
  mapState,
  mapDispatch
)(SlidesBar);
