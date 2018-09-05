import 'focus-visible';
import * as React from 'react';
import { connect } from 'react-redux';
import {
  handleFullscreenChange,
  playerElementMounted
} from '../actions/player';
import { IConnectedReduxProps } from '../store';
import themes from '../themes';
import { isDocumentFullscreen } from '../utils/fullscreen';
import { injectGlobalStyles } from '../utils/global-styles';
import { ThemeProvider } from '../utils/styled-components';
import IntlWrapper from './IntlWrapper';
import Player from './Player';
import StyledAiana from './styled/StyledAiana';

const { inria } = themes;

const debugSources = [
  {
    src: 'https://d381hmu4snvm3e.cloudfront.net/videos/w0z9Ik6mMj83/SD.mp4',
    type: 'video/mp4'
  }
];

interface IProps {
  isFullscreen: boolean;
}

class Aiana extends React.Component<IProps & IConnectedReduxProps> {
  private fullscreenRef = React.createRef<HTMLElement>();

  constructor(props: any) {
    super(props);

    injectGlobalStyles();
  }

  public componentDidMount() {
    const { dispatch } = this.props;

    if (this.fullscreenRef.current) {
      dispatch(playerElementMounted(this.fullscreenRef.current));
    }

    this.bindDocumentFullscreenEvents();
  }

  public componentWillUnmount() {
    this.unbindDocumentFullscreenEvents();
  }

  public render() {
    return (
      <IntlWrapper>
        <ThemeProvider theme={inria}>
          <StyledAiana innerRef={this.fullscreenRef}>
            <Player mediaSources={debugSources} />
          </StyledAiana>
        </ThemeProvider>
      </IntlWrapper>
    );
  }

  private bindDocumentFullscreenEvents = () => {
    document.addEventListener('fullscreenchange', this.fullscreenHandler);
    document.addEventListener('webkitfullscreenchange', this.fullscreenHandler);
    document.addEventListener('mozfullscreenchange', this.fullscreenHandler);
    document.addEventListener('MSFullscreenChange', this.fullscreenHandler);
  };

  private unbindDocumentFullscreenEvents = () => {
    document.removeEventListener('fullscreenchange', this.fullscreenHandler);
    document.removeEventListener(
      'webkitfullscreenchange',
      this.fullscreenHandler
    );
    document.removeEventListener('mozfullscreenchange', this.fullscreenHandler);
    document.removeEventListener('MSFullscreenChange', this.fullscreenHandler);
  };

  private fullscreenHandler = () => {
    const { dispatch } = this.props;

    dispatch(handleFullscreenChange(isDocumentFullscreen()));
  };
}

export default connect()(Aiana);
