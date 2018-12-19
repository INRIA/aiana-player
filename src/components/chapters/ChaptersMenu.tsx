import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers/index';
import { IRawChaptersTrack, isActiveTrack } from '../../utils/media';
import AssistiveText from '../a11y/AssistiveText';
import withUniqueId, { InjectedUniqueIdProps } from '../hocs/withUniqueId';
import ChaptersList from './ChaptersList';
import StyledChapters from './Styles';

export interface IMediaChapters {
  chaptersText?: string;
  chaptersTracks: IRawChaptersTrack[];
}

interface IProps extends IMediaChapters, InjectedUniqueIdProps {}

function ChaptersMenu({ chaptersText, chaptersTracks, uid }: IProps) {
  const activeChaptersTrack = chaptersTracks.find(isActiveTrack);

  if (!activeChaptersTrack) {
    return null;
  }

  return (
    <StyledChapters className="aip-chapters" aria-labelledby={uid}>
      <div id={uid}>
        <AssistiveText>{activeChaptersTrack.label}</AssistiveText>
      </div>
      <ChaptersList
        activeText={chaptersText}
        chapters={activeChaptersTrack.cues}
      />
    </StyledChapters>
  );
}

const mapStateToProps = (state: IAianaState) => ({
  chaptersText: state.chapters.currentText,
  chaptersTracks: state.chapters.chaptersTracks
});

export default connect(mapStateToProps)(withUniqueId(ChaptersMenu));
