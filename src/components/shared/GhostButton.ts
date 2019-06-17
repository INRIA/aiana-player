import styled from '../../utils/styled-components';

export default styled.button`
  display: inline-block;
  width: 2.25em;
  height: 100%;
  padding: 0;

  border: 2px solid transparent;
  border-radius: 0;
  background-color: transparent;
  font-family: inherit;
  font-size: 100%;
  color: inherit;
  text-align: inherit;
  line-height: inherit;
  overflow: hidden;

  transition: border-color 0.1s;

  &:not([aria-disabled='true']):not([disabled]):not([aria-hidden='true']) {
    cursor: pointer;
  }

  &:focus:not([data-focus-visible-added]),
  &[data-focus-visible-added] {
    outline: none;
  }

  &[data-focus-visible-added] {
    border-color: ${(props) => props.theme.focus};
  }
`;
