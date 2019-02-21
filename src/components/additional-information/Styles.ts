import styled from '../../utils/styled-components';

const StyledAdditionalInformation = styled.aside`
  padding: 1em;

  color: ${(props) => props.theme.bg};
  background-color: ${(props) => props.theme.fg};
`;

export default StyledAdditionalInformation;
