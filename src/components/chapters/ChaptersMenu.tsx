import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers/index';
import { IRawChaptersTrack } from '../../utils/media';
import AssistiveText from '../a11y/AssistiveText';
import withUniqueId, { InjectedUniqueIdProps } from '../hocs/withUniqueId';
import ChaptersList from './ChaptersList';
import StyledChapters from './Styles';

export interface IMediaChapters {
  chaptersTracks: IRawChaptersTrack[];
  language: string;
}

interface IProps extends IMediaChapters, InjectedUniqueIdProps {}

function ChaptersMenu({ chaptersTracks, language, uid }: IProps) {
  const activeChaptersTrack = chaptersTracks.find(
    (track) => track.language === language
  );

  if (!activeChaptersTrack) {
    return null;
  }

  return (
    <StyledChapters className="aip-chapters" aria-labelledby={uid}>
      <div id={uid}>
        <AssistiveText>{activeChaptersTrack.label}</AssistiveText>
      </div>
      <ChaptersList chapters={activeChaptersTrack.cues} />
    </StyledChapters>
  );
}

const mapStateToProps = (state: IAianaState) => ({
  chaptersTracks: state.chapters.chaptersTracks,
  language: state.chapters.language
});

export default connect(mapStateToProps)(withUniqueId(ChaptersMenu));
