import { hexToHsla } from '../../utils/colors';
import styled from '../../utils/styled-components';

const StyledDiv = styled.div`
  display: block;

  height: 0.375em;
  width: 100%;

  cursor: pointer;

  .aip-progress__slider {
    height: 0.375em;
    width: 100%;

    position: relative;

    cursor: pointer;

    outline: none;

    &[data-focus-visible-added] {
      .aip-progress__seekbar {
        outline: solid 2px ${(props) => props.theme.actionBg};
      }
    }
  }

  .aip-progress__seekbar {
    height: 0.375em;
    width: 100%;
    position: absolute;
    top: calc(50% - 0.1875em);
    background-color: ${(props) => hexToHsla(props.theme.fg, 0.3)};
  }

  .aip-progress__seekbar__expander {
    position: absolute;
    bottom: calc(50% - 0.5em);
    width: 100%;
    height: 1.5em;
  }

  .aip-progress__elapsed {
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

  .aip-progress__slider-handle {
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
