import StyledButton from 'src/components/styled/StyledButton';
import styled from 'src/utils/styled-components';

const StyledToggleButton = styled(StyledButton)`
  width: auto;
  height: auto;
  padding: .2em;

  display: flex;

  border: 2px solid ${(props) => props.theme.bg};
  border-radius: 4px;
  background-color: ${(props) => props.theme.fg};
  font-size: .75em;
  font-weight: bold;
  text-transform: lowercase;

  span {
    padding: .25em .5em;
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

  &[aria-pressed='true'] {
    .off {
      background: transparent;
      color: ${(props) => props.theme.bg};
    }

    .on {
      background: ${(props) => props.theme.bg};
      color: ${(props) => props.theme.fg};
    }
  }
  /* display: inline-block;
  width: 1em;
  height: 1em;
  cursor: pointer;

  border: 1px solid ${(props) => props.theme.bg};

  box-shadow: inset 0 2px 0 0 ${(props) => props.theme.fg},
    inset 0 -2px 0 0 ${(props) => props.theme.fg},
    inset 2px 0 0 0 ${(props) => props.theme.fg},
    inset -2px 0 0 0 ${(props) => props.theme.fg};

  background: ${(props) => props.theme.fg};


  &[data-focus-visible-added] {
    box-shadow: 0 0 0 2px ${(props) => props.theme.focus};
    outline: none;
  } */
`;

export default StyledToggleButton;
