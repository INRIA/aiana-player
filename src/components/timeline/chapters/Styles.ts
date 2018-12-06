import styled from '../../../utils/styled-components';

const StyledNav = styled.nav`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  ol {
    height: 100%;
    width: 100%;

    margin: 0;
    padding: 0;

    position: relative;
  }

  li {
    display: block;
    height: 100%;

    position: absolute;

    font-size: 0.875em;
    list-style: none;
    line-height: 1;
  }
`;

export default StyledNav;
