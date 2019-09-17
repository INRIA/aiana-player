import styled from '../../utils/styled-components';

export default styled.svg.attrs(() => ({
  'aria-hidden': true
}))`
  width: 100%;
  height: 100%;
  pointer-events: none;
  fill: ${(props) => props.theme.fg};
`;
