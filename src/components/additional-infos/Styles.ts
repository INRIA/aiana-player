import styled from '../../utils/styled-components';

const StyledAdditionalInfos = styled.aside`
  width: 49%;
  height: calc(49% - 2.125em);
  position: absolute;
  right: 0;
  top: 0;
  border: 1px solid ${(props) => props.theme.fg};
  padding: 1em;
  color: ${(props) => props.theme.bg};
  background-color: ${(props) => props.theme.fg};
`;

export default StyledAdditionalInfos;
