import { hexToHsla } from '../../utils/colors';
import styled from '../../utils/styled-components';

export default styled.div`
  display: inline-block;

  width: 0em;
  height: 100%;

  cursor: pointer;
  transition: width 0.2s ease-in;

  &.active,
  &.focus-visible,
  &:focus,
  &:hover {
    width: 4em;
    transition: width 0.2s cubic-bezier(0, 0, 0.2, 1);
  }

  .aip-volume-slider {
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
    touch-action: none;
  }

  .aip-volume-slider-handle {
    position: absolute;
    top: calc(50% - 0.5em);
    height: 1em;
    width: 1em;
    background-color: ${(props) => props.theme.fg};
    border-radius: 0.5em;

    &:before,
    &:after {
      content: ' ';
      position: absolute;
      display: block;
      top: calc(50% - 2px);
      height: 4px;
      width: 5em;
    }

    &:before {
      background-color: ${(props) => props.theme.fg};
      right: 0.5em;
    }

    &:after {
      background-color: ${(props) => hexToHsla(props.theme.fg, 0.3)};
      left: 0.5em;
    }
  }
`;
