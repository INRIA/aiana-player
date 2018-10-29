import * as React from 'react';
import { connect } from 'react-redux';
import { DEFAULT_LANG } from 'src/constants';
import { IAianaState } from 'src/reducers/index';
import { IRawChapterTrack } from 'src/utils/media-tracks';
import { uuid } from 'src/utils/ui';
import MediaChapterButton from './MediaChapterButton';
import StyledChapters from './Styles';

interface IChapter {
  startTime: number;
  text: string;
}

interface IChaptersList {
  chapters: IChapter[];
}

const ChaptersList: React.SFC<IChaptersList> = ({ chapters }) => {
  if (chapters.length === 0) {
    return null;
  }

  return (
    <ol>
      {chapters.map(({ startTime, text }, idx) => (
        <li key={idx}>
          <MediaChapterButton startTime={startTime}>{text}</MediaChapterButton>
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
  const chapters = cues.map((cue) => ({
    startTime: cue.startTime,
    text: cue.text
  }));
  const uid = uuid();

  return (
    <StyledChapters className="aip-chapters" aria-labelledby={uid}>
      <div id={uid}>{activeTrack.label}</div>
      <ChaptersList chapters={chapters} />
    </StyledChapters>
  );
};

const mapStateToProps = (state: IAianaState) => ({
  chaptersTracks: state.player.chaptersTracks,
  language: state.preferences.language
});

export default connect(mapStateToProps)(MediaChapters);
