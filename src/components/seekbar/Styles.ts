import { hexToHsla } from 'src/utils/colors';
import styled from 'src/utils/styled-components';

const StyledDiv = styled.div`
  display: block;
  height: 0.375em;
  width: 100%;
  cursor: pointer;

  .aip-progress-slider {
    height: 0.375em;
    width: 100%;
    position: relative;
    cursor: pointer;

    &[data-focus-visible-added] {
      box-shadow: 0 0 0 2px ${(props) => props.theme.focus};
      outline: none;
    }
  }

  .aip-seekbar {
    height: 0.375em;
    width: 100%;
    position: absolute;
    top: calc(50% - 0.1875em);
    background-color: ${(props) => hexToHsla(props.theme.fg, 0.3)};
  }

  .aip-seekbar-expander {
    position: absolute;
    top: -2em;
    width: 100%;
    height: 2em;
  }

  .aip-play-progress {
    height: 0.375em;
    width: 100%;
    position: absolute;
    top: calc(50% - 0.1875em);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.1s cubic-bezier(0.4, 0, 1, 1);
    background-color: ${(props) => props.theme.main};
    pointer-events: none;

    &.no-transition {
      transition: none;
    }
  }

  .aip-progress-slider-handle {
    position: absolute;
    top: calc(50% - 0.5em);
    left: 0;
    display: inline-block;
    height: 1em;
    width: 1em;
    border-radius: 0.5em;
    background-color: ${(props) => props.theme.main};
    transition: transform 0.15s cubic-bezier(0.4, 0, 1, 1);
    transform: translateX(0);
    pointer-events: none;

    &.no-transition {
      transition: none;
    }
  }
`;

export default StyledDiv;
