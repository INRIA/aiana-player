import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../reducers/index';
import styled from '../utils/styled-components';
import VideoPlayer from './video/VideoPlayer';
import VideoPlayerControls from './video/VideoPlayerControls';

interface IProps {
  nativeControls: boolean;
}

const StyledDiv = styled.div`
  background-color: ${(props) => props.theme.bg};
  position: relative;
`;

class Player extends React.Component<IProps> {
  public render() {
    return (
      <StyledDiv className="aip-player">
        <VideoPlayer />
        {this.getPlayerControls()}
      </StyledDiv>
    );
  }

  private getPlayerControls = () => {
    const { nativeControls } = this.props;

    if (nativeControls) {
      return null;
    }

    return <VideoPlayerControls />;
  };
}

export default connect((state: IAianaState) => ({
  nativeControls: state.player.nativeControls
}))(Player);
