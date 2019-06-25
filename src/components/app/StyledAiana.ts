import styled from '../../utils/styled-components';

const StyledAiana = styled.div`
  background-color: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.fg};

  &.inactive {
    &,
    & * {
      cursor: none;
    }
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

    &:focus:not([data-focus-visible-added]) {
      outline: none;
    }
  }
`;

export default StyledAiana;
