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
`;

export default StyledAiana;
