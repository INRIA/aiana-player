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
import Loader from '../Loader';

interface IStateProps {
  fontFace: string;
  fontUppercase: boolean;
  fontSizeMultiplier: number;
  lineHeight: number;
  theme: string;
  themes: string[];
}

interface IDispatchProps {
  handleFetchInitialData(): void;
  handleFullscreenChange(isFullscreen: boolean): void;
  playerElementMounted(playerElement: HTMLElement): void;
}

interface IAiana extends IStateProps, IDispatchProps {}

class Aiana extends Component<IAiana> {
  fullscreenRef = createRef<HTMLDivElement>();

  render() {
    return (
      <ThemeProvider theme={themes[this.props.theme]}>
        <StyledAiana
          className="aip-app"
          ref={this.fullscreenRef}
          style={{
            fontFamily: this.props.fontFace,
            fontSize: `${this.props.fontSizeMultiplier}em`,
            lineHeight: this.props.lineHeight,
            textTransform: this.props.fontUppercase ? 'uppercase' : 'none'
          }}
        >
          <Suspense fallback={<Loader />}>
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

  fullscreenHandler = () => {
    this.props.handleFullscreenChange(isDocumentFullscreen());
  };
}

function mapState(state: IAianaState) {
  return {
    fontFace: state.preferences.fontFace,
    fontSizeMultiplier: state.preferences.fontSizeMultiplier,
    fontUppercase: state.preferences.fontUppercase,
    lineHeight: state.preferences.lineHeight,
    theme: state.preferences.theme,
    themes: state.preferences.themes
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
