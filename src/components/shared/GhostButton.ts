import styled from '../../utils/styled-components';

export default styled.button.attrs((props) => ({
  type: props.type || 'button'
}))`
  display: inline-block;
  width: 2.25em;
  height: 100%;
  padding: 0;

  border: 0 none;
  border-radius: 0;
  background-color: transparent;
  font-family: inherit;
  font-size: 100%;
  color: inherit;
  text-align: inherit;
  line-height: inherit;
  overflow: hidden;
  outline: 0;

  transition: border-color 0.1s;

  &:not([aria-disabled='true']):not([disabled]):not([aria-hidden='true']) {
    cursor: pointer;
  }

  &[data-focus-visible-added] {
    outline: solid 2px ${(props) => props.theme.focus};
  }
`;
