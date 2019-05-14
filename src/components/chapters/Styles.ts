import styled from '../../utils/styled-components';

const StyledChapters = styled.nav`
  width: 100%;

  padding: 1em;

  display: flex;
  flex-direction: column;
  justify-content: center;

  color: ${(props) => props.theme.bg};
  background-color: ${(props) => props.theme.fg};

  ol {
    margin: 0;
  }

  .active button {
    font-weight: bold;
  }
`;

export default StyledChapters;
