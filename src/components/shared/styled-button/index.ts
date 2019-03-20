import styled from '../../../utils/styled-components';

export default styled.button`
  display: inline-block;
  width: 2.25em;
  height: 100%;
  padding: 0;

  border: none;
  border-radius: 0;
  background-color: transparent;
  font-size: 100%;
  color: inherit;
  text-align: inherit;
  line-height: inherit;
  overflow: hidden;

  &:not([aria-disabled='true']):not([disabled]):not([aria-hidden='true']) {
    cursor: pointer;
  }
`;
