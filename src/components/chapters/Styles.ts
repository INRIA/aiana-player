import styled from '../../utils/styled-components';

const StyledChapters = styled.nav`
  position: absolute;
  left: 0;
  top: 0;

  width: 49%;
  height: calc(49% - 2.125em);
  padding: 1em;
  border: 1px solid ${(props) => props.theme.fg};

  line-height: 1.5;
  color: ${(props) => props.theme.bg};
  background-color: ${(props) => props.theme.fg};
`;

export default StyledChapters;
