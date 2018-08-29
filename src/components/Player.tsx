import * as React from 'react';
import {
  DEFAULT_MEDIA_TYPE,
  DEFAULT_NATIVE_CONTROLS,
  MEDIA_TYPE_VIDEO
} from '../constants';
import styled from '../utils/styled-components';
import VideoPlayer from './video/VideoPlayer';
import VideoPlayerControls from './video/VideoPlayerControls';

interface IProps {
  mediaSources?: any[];
  nativeControls?: boolean;
  mediaType?: string;
  locale?: string;
}

const StyledDiv = styled.div`
  background-color: ${(props) => props.theme.bg};
`;

const StyledRelative = styled.div`
  position: relative;
`;

class Player extends React.Component<IProps> {
  public static defaultProps: IProps = {
    mediaType: DEFAULT_MEDIA_TYPE,
    nativeControls: DEFAULT_NATIVE_CONTROLS
  };

  public render() {
    const { locale, mediaSources, mediaType, nativeControls } = this.props;

    return (
      <StyledDiv lang={locale}>
        {mediaType === MEDIA_TYPE_VIDEO && (
          <StyledRelative>
            <VideoPlayer controls={nativeControls} sources={mediaSources} />
            <VideoPlayerControls />
          </StyledRelative>
        )}
      </StyledDiv>
    );
  }
}

export default Player;
