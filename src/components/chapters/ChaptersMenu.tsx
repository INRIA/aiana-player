import * as React from 'react';
import { connect } from 'react-redux';
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
  const activeChaptersTrack = chaptersTracks.find(
    (track) => track.language === language
  );

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
