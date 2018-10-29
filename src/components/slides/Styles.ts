import styled from 'src/utils/styled-components';

const Styles = styled.div`
  position: absolute;
  right: 0;
  bottom: 4.25em;

  width: 49%;
  height: calc(49% - 2.125em);
  padding: 1em;

  line-height: 1.5;
  color: ${(props) => props.theme.bg};
  background-color: ${(props) => props.theme.fg};
`;

export default Styles;
