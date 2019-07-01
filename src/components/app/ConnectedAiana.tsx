import styled from '../../utils/styled-components';
import classNames from 'classnames';
import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { handleFullscreenChange } from '../../actions/player';
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
}

interface IAiana extends IStateProps, IDispatchProps {}

const StyledAiana = styled.div`
  background-color: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.fg};

  &:fullscreen {
    @media screen and (min-width: 700px) {
      font-size: calc((100% * (9 / 16)) + 1vw);
    }

    @media screen and (min-width: 2000px) {
      font-size: calc(100% * (29 / 16));
    }
  }

  &.inactive {
    &,
    & * {
      cursor: none;
    }
  }

  select {
    font-family: inherit;
  }

  /* TODO: remove debug styles */
  input[type='checkbox'],
  select {
    &[data-focus-visible-added] {
      box-shadow: 0 0 0 2px ${(props) => props.theme.focus};
      outline: none;
    }

    &:focus:not([data-focus-visible-added]) {
      outline: none;
    }
  }

  .aip-player-wrapper {
    width: 100%;
    height: 100%;
  }
`;

class Aiana extends Component<IAiana> {
  render() {
    return (
      <ThemeProvider theme={themes[this.props.theme]}>
        <StyledAiana
          className={classNames('aip-app', {
            'aip-app__fullscreen': isDocumentFullscreen()
          })}
          style={{
            fontFamily: this.props.fontFace,
            lineHeight: this.props.lineHeight,
            textTransform: this.props.fontUppercase ? 'uppercase' : 'none'
          }}
        >
          <Suspense fallback={<Loader text="Media player is loading." />}>
            <SvgFilters />
            <div
              className="aip-player-wrapper"
              style={{
                fontSize: `${this.props.fontSizeMultiplier}em`
              }}
            >
              <Player />
            </div>
          </Suspense>
        </StyledAiana>
      </ThemeProvider>
    );
  }

  componentDidMount() {
    this.props.handleFetchInitialData();
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
  handleFullscreenChange
};

export default connect(
  mapState,
  mapDispatch
)(Aiana);
