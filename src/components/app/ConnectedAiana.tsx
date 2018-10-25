import 'focus-visible';
import * as React from 'react';
import { connect } from 'react-redux';
import {
  handleFullscreenChange,
  playerElementMounted
} from 'src/actions/player';
import { IAianaState } from 'src/reducers/index';
import themes from 'src/themes';
import { isDocumentFullscreen } from 'src/utils/fullscreen';
import { injectGlobalStyles } from 'src/utils/global-styles';
import { ThemeProvider } from 'src/utils/styled-components';
import Player from '../Player';
import PreferencesPanel from '../preferences/PreferencesPanel';
import StyledAiana from '../styled/StyledAiana';
import IntlWrapper from './IntlWrapper';

interface IProps {
  availableThemes: string[];
  currentTheme: string;
}

interface IDispatchProps {
  handleFullscreenChange: (isFullscreen: boolean) => void;
  playerElementMounted: (playerElement: HTMLElement) => void;
}

interface IAiana extends IProps, IDispatchProps {}

class Aiana extends React.Component<IAiana> {
  private fullscreenRef = React.createRef<HTMLElement>();

  constructor(props: any) {
    super(props);
    injectGlobalStyles();
  }

  public componentDidMount() {
    if (this.fullscreenRef.current) {
      this.props.playerElementMounted(this.fullscreenRef.current);
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
    this.props.handleFullscreenChange(isDocumentFullscreen());
  };
}

const mapStateToProps = (state: IAianaState) => ({
  currentTheme: state.preferences.currentTheme
});

const mapDispatchToProps = {
  handleFullscreenChange,
  playerElementMounted
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Aiana);
