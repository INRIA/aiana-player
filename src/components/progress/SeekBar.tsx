import styled from '../../utils/styled-components';
import { hexToHsla } from '../../utils/colors';

const SeekBar = styled.div`
  height: 0.375em;
  width: 100%;
  position: absolute;
  top: calc(50% - 0.1875em);
  background-color: ${(props) => hexToHsla(props.theme.fg, 0.3)};
`;

export default SeekBar;
