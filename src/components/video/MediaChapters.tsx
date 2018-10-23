import * as React from 'react';
import { connect } from 'react-redux';
import { DEFAULT_LANG } from '../../constants';
import { IAianaState } from '../../reducers/index';
import { IMediaCue, IRawChapterTrack } from '../../utils/media-tracks';
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

interface ICuesList {
  cues: IMediaCue[];
}

const CuesList: React.SFC<ICuesList> = ({ cues }) => {
  if (cues.length === 0) {
    return null;
  }

  return (
    <ol>
      {cues.map((vttCue, index) => (
        <li key={index}>
          <MediaChapterButton startTime={vttCue.startTime}>
            {vttCue.text}
          </MediaChapterButton>
        </li>
      ))}
    </ol>
  );
};

interface IMediaChapters {
  chaptersTracks: IRawChapterTrack[];
  language: string;
}

const MediaChapters: React.SFC<IMediaChapters> = ({
  chaptersTracks,
  language
}) => {
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
      <CuesList cues={cues} />
    </StyledChapters>
  );
};

const mapStateToProps = (state: IAianaState) => ({
  chaptersTracks: state.player.chaptersTracks,
  language: state.preferences.language
});

export default connect(mapStateToProps)(MediaChapters);