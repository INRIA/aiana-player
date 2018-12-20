import * as React from 'react';
import { connect } from 'react-redux';
import { requestSeek } from '../../../actions/player';
import { DEFAULT_LANG } from '../../../constants';
import { IAianaState } from '../../../reducers';
import { unitToPercent } from '../../../utils/math';
import { IRawSlidesTrack } from '../../../utils/media';
import styled from '../../../utils/styled-components';
import SlideButton from './SlideButton';

interface IStateProps {
  currentLanguage: string;
  duration: number;
  media?: HTMLMediaElement;
  slidesTracks: IRawSlidesTrack[];
}

interface IDispatchProps {
  requestSeek(media: HTMLMediaElement, seekingTime: number): any;
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
  currentLanguage,
  media,
  requestSeek: requestSeekAction
}: ISlidesBar) {
  const activeSlidesTrack =
    slidesTracks.find((track) => track.language === currentLanguage) ||
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
              onClick={requestSeekAction}
              media={media}
              time={startTime}
            />
          </li>
        ))}
      </ol>
    </StyledSlidesBar>
  );
}

function mapStateToProps(state: IAianaState) {
  return {
    currentLanguage: state.preferences.currentLanguage,
    duration: state.player.duration,
    media: state.player.mediaElement,
    slidesTracks: state.slides.slidesTracks
  };
}

const mapDispatchToProps = {
  requestSeek
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SlidesBar);
