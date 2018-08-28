import styled from 'styled-components';

export default styled.button`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  padding: 0;

  border: 0;
  border-radius: 0;
  background-color: transparent;
  font-size: 100%;
  color: inherit;
  text-align: inherit;
  line-height: inherit;

  &:not([aria-disabled='true']):not([disabled]):not([aria-hidden='true']) {
    cursor: pointer;
  }
`;
