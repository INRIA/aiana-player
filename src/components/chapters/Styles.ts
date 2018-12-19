import styled from '../../utils/styled-components';

const StyledChapters = styled.nav`
  position: absolute;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 49%;
  height: calc(49% - 2.125em);
  padding: 1em;
  border: 1px solid ${(props) => props.theme.fg};

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
