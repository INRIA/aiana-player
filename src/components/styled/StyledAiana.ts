import styled from '../../utils/styled-components';

const StyledAiana = styled.div`
  display: block;
  width: 800px;
  /* height: 450px; */
  box-sizing: border-box;
  background-color: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.fg};
  font-size: 1rem;
  font-family: system, sans-serif;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  *:focus:not([data-focus-visible-added]) {
    outline: none;
  }

  *[data-focus-visible-added] {
    box-shadow: inset 0 0 0 2px #3b70bd;
    outline: none;
  }
`;

export default StyledAiana;
