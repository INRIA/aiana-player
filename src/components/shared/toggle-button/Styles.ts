import styled from '../../../utils/styled-components';
import GhostButton from '../GhostButton';

const StyledToggleButton = styled(GhostButton)`
  width: auto;
  height: auto;
  padding: 0.2em;

  display: flex;

  border: 2px solid ${(props) => props.theme.bg};
  border-radius: 4px;
  background-color: ${(props) => props.theme.fg};
  font-size: 0.75em;
  font-weight: bold;
  text-transform: lowercase;

  span {
    padding: 0.25em 0.5em;
    border-radius: 4px;
    flex: 1;
  }

  .off {
    background: ${(props) => props.theme.bg};
    color: ${(props) => props.theme.fg};
  }

  .on {
    background: transparent;
    color: ${(props) => props.theme.bg};
  }

  &[aria-checked='true'] {
    .off {
      background: transparent;
      color: ${(props) => props.theme.bg};
    }

    .on {
      background: ${(props) => props.theme.bg};
      color: ${(props) => props.theme.fg};
    }
  }
`;

export default StyledToggleButton;
