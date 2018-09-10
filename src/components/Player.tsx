import * as React from 'react';
import { DEFAULT_NATIVE_CONTROLS } from '../constants';
import styled from '../utils/styled-components';
import VideoPlayer from './video/VideoPlayer';
import VideoPlayerControls from './video/VideoPlayerControls';

interface IProps {
  mediaSources?: any[];
  nativeControls?: boolean;
}

const StyledDiv = styled.div`
  background-color: ${(props) => props.theme.bg};
  position: relative;
`;

class Player extends React.Component<IProps> {
  public static defaultProps: IProps = {
    nativeControls: DEFAULT_NATIVE_CONTROLS
  };

  public render() {
    const { mediaSources, nativeControls } = this.props;

    return (
      <StyledDiv className="aip-player">
        <VideoPlayer controls={nativeControls} sources={mediaSources} />
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

export default Player;
