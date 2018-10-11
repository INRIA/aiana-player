import 'focus-visible';
import * as React from 'react';
import { connect } from 'react-redux';
import {
  handleFullscreenChange,
  playerElementMounted
} from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store';
import themes from '../../themes';
import { isDocumentFullscreen } from '../../utils/fullscreen';
import { injectGlobalStyles } from '../../utils/global-styles';
import { ThemeProvider } from '../../utils/styled-components';
import Player from '../Player';
import PreferencesPanel from '../preferences/PreferencesPanel';
import StyledAiana from '../styled/StyledAiana';
import MediaChapters from '../video/MediaChapters';
import IntlWrapper from './IntlWrapper';

interface IAiana extends IConnectedReduxProps {
  availableThemes: string[];
  currentTheme: string;
}

class Aiana extends React.Component<IAiana> {
  private fullscreenRef = React.createRef<HTMLElement>();

  constructor(props: any) {
    super(props);

    injectGlobalStyles();
  }

  public componentDidMount() {
    if (this.fullscreenRef.current) {
      this.props.dispatch(playerElementMounted(this.fullscreenRef.current));
    }

    this.bindDocumentFullscreenEvents();
  }

  public componentWillUnmount() {
    this.unbindDocumentFullscreenEvents();
  }

  public render() {
    const currentTheme = themes[this.props.currentTheme];

    return (
      <IntlWrapper>
        <ThemeProvider theme={currentTheme}>
          <StyledAiana className="aip-app" innerRef={this.fullscreenRef}>
            <Player />
            <MediaChapters />
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
    this.props.dispatch(handleFullscreenChange(isDocumentFullscreen()));
  };
}

export default connect((state: IAianaState) => ({
  currentTheme: state.preferences.currentTheme
}))(Aiana);
