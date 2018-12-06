import styled from '../../utils/styled-components';
import { hexToHsla } from '../../utils/colors';

const StyledTimeRanges = styled.div`
  height: 100%;

  svg {
    display: block;
    width: 100%;
    height: 100%;

    fill: ${(props) => hexToHsla(props.theme.fg, 0.7)};
  }
`;

export default StyledTimeRanges;
