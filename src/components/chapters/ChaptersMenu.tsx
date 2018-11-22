import * as React from 'react';
import { connect } from 'react-redux';
import { DEFAULT_LANG } from 'src/constants';
import { IAianaState } from 'src/reducers/index';
import { IRawChaptersTrack } from 'src/utils/media';
import { uuid } from 'src/utils/ui';
import AssistiveText from '../a11y/AssistiveText';
import ChaptersList from './ChaptersList';
import StyledChapters from './Styles';

export interface IMediaChapters {
  chaptersTracks: IRawChaptersTrack[];
  language: string;
}

const ChaptersMenu: React.SFC<IMediaChapters> = ({
  chaptersTracks,
  language
}) => {
  // TODO: refactor with ChaptersBar
  const activeChaptersTrack =
    chaptersTracks.find((track) => track.language === language) ||
    chaptersTracks.find((track) => track.language === DEFAULT_LANG);

  if (!activeChaptersTrack) {
    return null;
  }

  const uid = uuid();

  return (
    <StyledChapters className="aip-chapters" aria-labelledby={uid}>
      <div id={uid}>
        <AssistiveText>{activeChaptersTrack.label}</AssistiveText>
      </div>
      <ChaptersList chapters={activeChaptersTrack.cues} />
    </StyledChapters>
  );
};

const mapStateToProps = (state: IAianaState) => ({
  chaptersTracks: state.chapters.chaptersTracks,
  language: state.chapters.language
});

export default connect(mapStateToProps)(ChaptersMenu);
