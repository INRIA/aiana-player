import { hexToHsla } from '../../utils/colors';
import styled from '../../utils/styled-components';

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
    bottom: calc(50% - 0.5em);
    width: 100%;
    height: 1.5em;
  }

  .aip-play-progress {
    height: 0.375em;
    width: 100%;
    position: absolute;
    top: calc(50% - 0.1875em);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.1s linear;
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
    display: none;
    height: 1em;
    width: 1em;
    border-radius: 0.5em;
    background-color: ${(props) => props.theme.main};
    transition: transform 0.1s linear;
    transform: translateX(0);
    pointer-events: none;

    &.no-transition {
      transition: none;
    }
  }
`;

export default StyledDiv;
