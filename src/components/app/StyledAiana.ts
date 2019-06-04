import styled from '../../utils/styled-components';

const StyledAiana = styled.div`
  display: block;
  width: 800px;
  /*
    The wanted canvas ratio is 16/9. To achieve that with a fixed width at
    800px, height should be 450px plus the height of the controls.
  */
  height: 546px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.fg};
  font-size: 1em;
  font-family: system, sans-serif;

  -webkit-font-smoothing: antialiased;

  &.inactive {
    &,
    & * {
      cursor: none;
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  [data-focus-visible-added] {
    box-shadow: inset 0 0 2px 2px ${(props) => props.theme.focus};
    outline: none;
  }

  *:focus:not([data-focus-visible-added]) {
    outline: none;
  }

  select {
    font-family: inherit;
  }

  /* TODO: remove debug styles */
  input[type='checkbox'],
  select {
    &[data-focus-visible-added] {
      box-shadow: 0 0 0 2px ${(props) => props.theme.focus};
      outline: none;
    }
  }
`;

export default StyledAiana;
