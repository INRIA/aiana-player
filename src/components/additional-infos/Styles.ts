import styled from 'src/utils/styled-components';

const StyledAdditionalInfos = styled.aside`
  width: 260px;
  position: absolute;
  left: 100%;
  bottom: 0;
  border: 1px solid ${(props) => props.theme.fg};
  padding: 1em 0.5em;
  color: ${(props) => props.theme.bg};
  background-color: ${(props) => props.theme.fg};
`;

export default StyledAdditionalInfos;
