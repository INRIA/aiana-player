import styled from '../../utils/styled-components';

const StyledAdditionalInfos = styled.aside`
  position: absolute;
  top: 0%;
  right: 0%;
  bottom: 60%;
  left: 60%;

  border: 1px solid ${(props) => props.theme.fg};
  padding: 1em;
  color: ${(props) => props.theme.bg};
  background-color: ${(props) => props.theme.fg};
`;

export default StyledAdditionalInfos;
