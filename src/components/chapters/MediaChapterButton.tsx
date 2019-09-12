import React, { ReactNode, useContext } from 'react';
import { connect } from 'react-redux';
import { seek } from '../../actions/player';
import styled from '../../utils/styled-components';
import GhostButton from '../shared/GhostButton';
import MediaContext from '../../contexts/MediaContext';

interface IProps {
  children: ReactNode;
  isActive: boolean;
  startTime: number;
}

interface IDispatchProps {
  seek(time: number): void;
}

interface IMediaChapterButton extends IProps, IDispatchProps {}

const StyledChapterButton = styled(GhostButton)`
  width: auto;
`;

function MediaChapterButton(props: IMediaChapterButton) {
  const [media] = useContext(MediaContext);

  return (
    <StyledChapterButton
      aria-pressed={props.isActive}
      type="button"
      onClick={() => {
        props.seek(props.startTime);
        media.currentTime = props.startTime;
      }}
    >
      {props.children}
    </StyledChapterButton>
  );
}

const mapDispatch = {
  seek
};

export default connect(
  null,
  mapDispatch
)(MediaChapterButton);
