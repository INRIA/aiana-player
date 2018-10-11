import * as React from 'react';
import { connect } from 'react-redux';
import { DEFAULT_LANG } from '../../constants';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store/index';
import { IRawChapterTrack } from '../../utils/media-tracks';
import styled from '../../utils/styled-components';

const StyledChapters = styled.div`
  position: absolute;
  right: 2rem;
  top: 2rem;
  border: 1px solid #000;
  padding: 1em;
  color: #000;
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
          <li key={index}>{vttCue.text}</li>
        ))}
      </StyledChapters>
    );
  }
}

export default connect((state: IAianaState) => ({
  chaptersTracks: state.player.chaptersTracks,
  language: state.preferences.language
}))(MediaChapters);
