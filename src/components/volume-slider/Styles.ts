import { hexToHsla } from '../../utils/colors';
import styled, { css } from '../../utils/styled-components';

export const sliderShownMixin = css`
  width: 4em;
`;

export default styled.div`
  display: inline-block;

  width: 0em;
  height: 100%;

  outline: none;
  border-width: 0;

  transition: width 0.2s ease-in;

  &:not([aria-disabled='true']):not([disabled]):not([aria-hidden='true']) {
    cursor: pointer;
  }

  &.active,
  &:hover,
  &.focus-visible,
  /* &:focus:not([data-focus-visible-added]), */
  &[data-focus-visible-added] {
    ${sliderShownMixin};
  }

  &.focus-visible,
  /* &:focus:not([data-focus-visible-added]), */
  &[data-focus-visible-added] {
    outline: solid 2px ${(props) => props.theme.actionBg};
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
