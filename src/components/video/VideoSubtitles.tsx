import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store';
import { hexToHsla } from '../../utils/colors';
import { formatSubtitles } from '../../utils/strings';
import styled from '../../utils/styled-components';

interface IVideoSubtitles extends IConnectedReduxProps {
  subtitleText: string | undefined;
}

const StyledSubtitles = styled.div`
  position: absolute;
  bottom: 5rem;
  left: 50%;
  line-height: 1.5em;
  font-size: 1.25em;
  text-align: center;
`;

const StyledSpan = styled.span`
  display: block;
  transform: translateX(-50%);

  span {
    display: inline-block;
    padding: 0 0.3em;
    border-radius: 0.2em;
    color: ${(props) => props.theme.fg};
    background: ${(props) => hexToHsla(props.theme.bg, 0.9)};

    white-space: nowrap;
  }
`;

class VideoSubtitles extends React.Component<IVideoSubtitles> {
  public render() {
    if (!this.props.subtitleText) {
      return null;
    }

    const text = formatSubtitles(this.props.subtitleText);

    return (
      <StyledSubtitles>
        {text.map((line, index) => (
          <StyledSpan key={index}>
            <span>{line}</span>
          </StyledSpan>
        ))}
      </StyledSubtitles>
    );
  }
}

export default connect((state: IAianaState) => ({
  subtitleText: state.player.subtitleText
}))(VideoSubtitles);
