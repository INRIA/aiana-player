import styled from '../../utils/styled-components';

const StyledAiana = styled.div`
  display: block;
  width: 800px;
  height: calc(450px + 3.75em);
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

  /* @todo: remove debug styles */
  input[type='checkbox'],
  select {
    &[data-focus-visible-added] {
      box-shadow: 0 0 0 2px ${(props) => props.theme.focus};
      outline: none;
    }
  }
`;

export default StyledAiana;
