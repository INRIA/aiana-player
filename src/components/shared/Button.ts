import Color from 'color';
import styled, { css } from '../../utils/styled-components';

export const focusMixin = css`
  background-color: ${(props) =>
    Color(props.theme.actionBg)
      .darken(0.3)
      .string()};
`;

export const buttonMixin = css`
  display: inline-block;
  height: 100%;
  padding: 0.4em 0.8em;

  border: 2px solid transparent;
  border-radius: 2px;
  background-color: ${(props) => props.theme.actionBg};

  font-family: inherit;
  font-size: 100%;
  color: ${(props) => props.theme.actionFg};
  text-align: inherit;
  line-height: inherit;
  outline: 0;
  overflow: hidden;

  transition: background-color 0.1s;

  &.button--small {
    font-size: 87.5%;
  }

  &.button--large {
    font-size: 112.5%;
  }

  &[aria-disabled='true'],
  &[disabled] {
    background-color: ${(props) => props.theme.colors.silver};
    color: ${(props) =>
      Color(props.theme.colors.white)
        .darken(0.7)
        .string()};
    cursor: not-allowed;
  }

  &:not([aria-disabled='true']):not([disabled]):not([aria-hidden='true']) {
    cursor: pointer;

    &:hover,
    &[data-focus-visible-added] {
      ${focusMixin};
    }

    &[data-focus-visible-added] {
      border-color: ${(props) => props.theme.actionBg};
    }
  }
`;

export default styled.button.attrs((props) => ({
  type: props.type || 'button'
}))`
  ${buttonMixin};
`;
