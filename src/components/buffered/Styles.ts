import { hexToHsla } from 'src/utils/colors';
import styled from 'src/utils/styled-components';

const StyledTimeRanges = styled.div`
  height: 100%;

  svg {
    display: block;
    width: 100%;
    height: 100%;

    rect {
      fill: ${(props) => hexToHsla(props.theme.fg, 0.5)};
    }
  }
`;

export default StyledTimeRanges;
