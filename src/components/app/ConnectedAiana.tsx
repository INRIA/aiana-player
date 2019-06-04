import React, { Component, createRef, Suspense } from 'react';
import { connect } from 'react-redux';
import {
  handleFullscreenChange,
  playerElementMounted
} from '../../actions/player';
import { handleFetchInitialData } from '../../actions/shared';
import SvgFilters from '../../components/shared/filters';
import { IAianaState } from '../../reducers';
import themes from '../../themes';
import {
  addFullscreenChangeEventListener,
  isDocumentFullscreen,
  removeFullscreenChangeEventListener
} from '../../utils/fullscreen';
import { ThemeProvider } from '../../utils/styled-components';
import Player from '../Player';
import StyledAiana from './StyledAiana';

interface IStateProps {
  fontFace: string;
  fontModifierUppercase: boolean;
  fontSizeMultiplier: number;
  availableThemes: string[];
  currentTheme: string;
  lineHeight: string;
}

interface IDispatchProps {
  handleFetchInitialData(): void;
  handleFullscreenChange(isFullscreen: boolean): void;
  playerElementMounted(playerElement: HTMLElement): void;
}

interface IAiana extends IStateProps, IDispatchProps {}

class Aiana extends Component<IAiana> {
  private fullscreenRef = createRef<HTMLDivElement>();

  render() {
    return (
      <ThemeProvider theme={themes[this.props.currentTheme]}>
        <StyledAiana
          className="aip-app"
          ref={this.fullscreenRef}
          style={{
            fontFamily: this.props.fontFace,
            fontSize: `${this.props.fontSizeMultiplier}em`,
            lineHeight: this.props.lineHeight,
            textTransform: this.props.fontModifierUppercase
              ? 'uppercase'
              : 'none'
          }}
        >
          <Suspense fallback={<div>I am loading</div>}>
            <SvgFilters />
            <Player />
          </Suspense>
        </StyledAiana>
      </ThemeProvider>
    );
  }

  componentDidMount() {
    this.props.handleFetchInitialData();
    this.props.playerElementMounted(this.fullscreenRef.current!);
    addFullscreenChangeEventListener(this.fullscreenHandler);
  }

  componentWillUnmount() {
    removeFullscreenChangeEventListener(this.fullscreenHandler);
  }

  private fullscreenHandler = () => {
    this.props.handleFullscreenChange(isDocumentFullscreen());
  };
}

function mapState(state: IAianaState) {
  return {
    availableThemes: state.preferences.themes,
    currentTheme: state.preferences.currentTheme,
    fontFace: state.preferences.activeFontFace,
    fontModifierUppercase: state.preferences.fontModifierUppercase,
    fontSizeMultiplier: state.preferences.activeFontSizeMultiplier,
    lineHeight: state.preferences.lineHeight
  };
}

const mapDispatch = {
  handleFetchInitialData,
  handleFullscreenChange,
  playerElementMounted
};

export default connect(
  mapState,
  mapDispatch
)(Aiana);
