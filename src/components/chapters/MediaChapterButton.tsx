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
  media?: HTMLMediaElement;
}

interface IDispatchProps {
  requestSeek: any;
}

interface IMediaChapterButton extends IProps, IStateProps, IDispatchProps {}

const StyledChapterButton = styled(GhostButton)`
  width: auto;
`;

function MediaChapterButton(props: IMediaChapterButton) {
  return (
    <StyledChapterButton
      aria-pressed={props.isActive}
      onClick={
        props.media
          ? () => props.requestSeek(props.media, props.startTime)
          : undefined
      }
      type="button"
    >
      {props.children}
    </StyledChapterButton>
  );
}

function mapState(state: IAianaState) {
  return {
    media: state.player.mediaElement
  };
}

const mapDispatch = {
  requestSeek
};

export default connect(
  mapState,
  mapDispatch
)(MediaChapterButton);
