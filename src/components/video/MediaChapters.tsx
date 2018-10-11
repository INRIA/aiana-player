import * as React from 'react';
import { connect } from 'react-redux';
import { DEFAULT_LANG } from '../../constants';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store/index';
import { IRawChapterTrack } from '../../utils/media-tracks';
import styled from '../../utils/styled-components';
import MediaChapterButton from './MediaChapterButton';

const StyledChapters = styled.div`
  width: 260px;
  position: absolute;
  left: 100%;
  top: 0;
  border: 1px solid ${(props) => props.theme.fg};
  padding: 1em 0.5em;
  color: ${(props) => props.theme.bg};
  background-color: ${(props) => props.theme.fg};
`;

interface IMediaChapters extends IConnectedReduxProps {
  chaptersTracks: IRawChapterTrack[];
  language: string;
}

class MediaChapters extends React.Component<IMediaChapters> {
  public render() {
    const { chaptersTracks, language } = this.props;

    const activeTrack =
      chaptersTracks.find((track) => track.language === language) ||
      chaptersTracks.find((track) => track.language === DEFAULT_LANG);

    if (!activeTrack) {
      return null;
    }

    const cues = [...activeTrack.cues[Symbol.iterator]()];

    return (
      <StyledChapters className="aip-chapters">
        <h3>{activeTrack.label}</h3>
        {cues.map((vttCue, index) => (
          <MediaChapterButton key={index} startTime={vttCue.startTime}>
            {vttCue.text}
          </MediaChapterButton>
        ))}
      </StyledChapters>
    );
  }
}

export default connect((state: IAianaState) => ({
  chaptersTracks: state.player.chaptersTracks,
  language: state.preferences.language
}))(MediaChapters);
