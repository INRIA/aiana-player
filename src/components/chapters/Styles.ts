import styled from 'src/utils/styled-components';

const StyledChapters = styled.nav`
  position: absolute;
  left: 100%;
  top: 0;

  width: 260px;
  padding: 1em 0.5em;
  border: 1px solid ${(props) => props.theme.fg};

  line-height: 1.5;
  color: ${(props) => props.theme.bg};
  background-color: ${(props) => props.theme.fg};
`;

export default StyledChapters;
