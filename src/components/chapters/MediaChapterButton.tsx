import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { requestSeek } from '../../actions/player';
import { IAianaState } from '../../reducers';
import styled from '../../utils/styled-components';
import GhostButton from '../shared/GhostButton';

interface IProps {
  children: ReactNode;
  isActive: boolean;
  startTime: number;
}

interface IStateProps {
  mediaSelector: string;
}

interface IDispatchProps {
  requestSeek(mediaSelector: string, time: number): void;
}

interface IMediaChapterButton extends IProps, IStateProps, IDispatchProps {}

const StyledChapterButton = styled(GhostButton)`
  width: auto;
`;

function MediaChapterButton(props: IMediaChapterButton) {
  return (
    <StyledChapterButton
      aria-pressed={props.isActive}
      onClick={() => props.requestSeek(props.mediaSelector, props.startTime)}
      type="button"
    >
      {props.children}
    </StyledChapterButton>
  );
}

function mapState(state: IAianaState) {
  return {
    mediaSelector: state.player.mediaSelector
  };
}

const mapDispatch = {
  requestSeek
};

export default connect(
  mapState,
  mapDispatch
)(MediaChapterButton);
