import { hexToHsla } from '../../utils/colors';
import styled from '../../utils/styled-components';

export const StyledSubtitles = styled.div`
  position: absolute;
  bottom: 6.5rem;
  left: 50%;
  text-align: center;

  pointer-events: none;
`;

export const StyledSpan = styled.span`
  display: block;
  transform: translateX(-50%);

  span {
    display: inline-block;
    padding: 0 0.3em;

    border-radius: 0.2em;
    color: ${(props) => props.theme.fg};
    background: ${(props) => hexToHsla(props.theme.bg, 0.9)};

    line-height: 1.5em;
    font-size: 1.25em;

    white-space: nowrap;
    pointer-events: all;
  }
`;
