import styled from '../../utils/styled-components';

const StyledChapters = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;

  line-height: 1.5;
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
