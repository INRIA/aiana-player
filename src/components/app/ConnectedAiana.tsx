import styled from '../../utils/styled-components';
import classNames from 'classnames';
import React, { Suspense, useEffect } from 'react';
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

function Aiana(props: IAiana) {
  const {
    theme,
    fontFace,
    lineHeight,
    fontUppercase,
    fontSizeMultiplier,
    handleFetchInitialData,
    handleFullscreenChange
  } = props;

  useEffect(() => {
    function fullscreenHandler() {
      handleFullscreenChange(isDocumentFullscreen());
    }

    handleFetchInitialData();
    addFullscreenChangeEventListener(fullscreenHandler);

    return function() {
      removeFullscreenChangeEventListener(fullscreenHandler);
    };
  }, [handleFetchInitialData, handleFullscreenChange]);

  return (
    <ThemeProvider theme={themes[theme]}>
      <StyledAiana
        className={classNames('aip-app', {
          'aip-app__fullscreen': isDocumentFullscreen()
        })}
        style={{
          fontFamily: fontFace,
          lineHeight: lineHeight,
          textTransform: fontUppercase ? 'uppercase' : 'none'
        }}
      >
        <Suspense fallback={<Loader text="Media player is loading." />}>
          <SvgFilters />
          <div
            className="aip-player-wrapper"
            style={{
              fontSize: `${fontSizeMultiplier}em`
            }}
          >
            <Player />
          </div>
        </Suspense>
      </StyledAiana>
    </ThemeProvider>
  );
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
