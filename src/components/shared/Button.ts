import Color from 'color';
import styled from '../../utils/styled-components';

export default styled.button`
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
  overflow: hidden;

  transition: background-color 0.1s;

  &:hover,
  &[data-focus-visible-added] {
    background-color: ${(props) =>
      Color(props.theme.actionBg)
        .darken(0.3)
        .string()};
  }

  &:not([aria-disabled='true']):not([disabled]):not([aria-hidden='true']) {
    cursor: pointer;
  }

  &:focus:not([data-focus-visible-added]),
  &[data-focus-visible-added] {
    outline: none;
  }

  &[data-focus-visible-added] {
    border-color: ${(props) => props.theme.actionBg};
  }
`;
