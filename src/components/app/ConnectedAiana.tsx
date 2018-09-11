import 'focus-visible';
import * as React from 'react';
import { connect } from 'react-redux';
import {
  handleFullscreenChange,
  playerElementMounted
} from '../../actions/player';
import { IConnectedReduxProps } from '../../store';
import themes from '../../themes';
import { isDocumentFullscreen } from '../../utils/fullscreen';
import { injectGlobalStyles } from '../../utils/global-styles';
import { ThemeProvider } from '../../utils/styled-components';
import Player from '../Player';
import PreferencesPanel from '../preferences/PreferencesPanel';
import StyledAiana from '../styled/StyledAiana';
import IntlWrapper from './IntlWrapper';

const { inria } = themes;

class Aiana extends React.Component<IConnectedReduxProps> {
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
          <StyledAiana className="aip-app" innerRef={this.fullscreenRef}>
            <Player />
            <PreferencesPanel />
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
