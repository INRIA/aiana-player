import classNames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers';
import { hexToHsla } from '../../utils/colors';
import styled from '../../utils/styled-components';
import AddBookmarkButton from '../buttons/add-bookmark/AddBookmarkButton';
import FullscreenButton from '../buttons/fullscreen/FullscreenButton';
import PlayButton from '../buttons/play/PlayButton';
import VolumeControl from '../buttons/VolumeControl';
import SeekBarSlider from '../seekbar/SeekBarSlider';
import TimeStatus from '../time-status/TimeStatus';

const StyledControlsWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  /* 0.5 + 0.3125 */
  padding: 0.8125rem 1rem 0.5rem;
  background-color: ${(props) => hexToHsla(props.theme.bg, 0.9)};

  &.inactive {
    opacity: 0;
  }
`;

const StyledControls = styled.div`
  display: flex;
  justify-content: space-between;
  height: 2.25em;
  margin-top: 0.3125em;
`;

interface IStateProps {
  isActive: boolean;
}

function VideoPlayerControls(props: IStateProps) {
  return (
    <StyledControlsWrapper
      className={classNames({ inactive: !props.isActive })}
    >
      <SeekBarSlider />
      <StyledControls className="aip-controls">
        <div className="aip-controls-left">
          <PlayButton />
          <VolumeControl />
          <TimeStatus />
          <AddBookmarkButton />
        </div>
        <div className="aip-controls-right">
          <FullscreenButton />
        </div>
      </StyledControls>
    </StyledControlsWrapper>
  );
}

function mapStateToProps(state: IAianaState) {
  return {
    isActive: state.preferences.isActive
  };
}

export default connect(mapStateToProps)(VideoPlayerControls);
