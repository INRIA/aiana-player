import 'focus-visible';
import * as React from 'react';
import { connect } from 'react-redux';
import {
  handleFullscreenChange,
  playerElementMounted
} from 'src/actions/player';
import SvgFilters from 'src/components/shared/filters';
import { IAianaState } from 'src/reducers/index';
import themes from 'src/themes';
import {
  addFullscreenChangeEventListener,
  isDocumentFullscreen,
  removeFullscreenChangeEventListener
} from 'src/utils/fullscreen';
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
    this.props.playerElementMounted(this.fullscreenRef.current!);

    addFullscreenChangeEventListener(this.fullscreenHandler);
  }

  public componentWillUnmount() {
    removeFullscreenChangeEventListener(this.fullscreenHandler);
  }

  public render() {
    const currentTheme = themes[this.props.currentTheme];

    return (
      <IntlWrapper>
        <ThemeProvider theme={currentTheme}>
          <StyledAiana className="aip-app" innerRef={this.fullscreenRef}>
            <SvgFilters />
            <Player />
            <PreferencesPanel />
          </StyledAiana>
        </ThemeProvider>
      </IntlWrapper>
    );
  }

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
