import React from 'react';
import { connect } from 'react-redux';
import withWidget from '../../hocs/with-widget';
import { IAianaState } from '../../reducers';
import { IRawTrack, isActiveTrack } from '../../utils/media';
import AssistiveText from '../a11y/AssistiveText';
import ChaptersList from './ChaptersList';
import styled from '../../utils/styled-components';
import useId from '../../hooks/useId';

export interface IMediaChapters {
  chaptersText?: string;
  chaptersTracks: IRawTrack[];
}

const Nav = styled.nav`
  width: 100%;

  padding: 1em;

  display: flex;
  flex-direction: column;
  justify-content: center;

  color: ${(props) => props.theme.bg};
  background-color: ${(props) => props.theme.fg};
`;

function ChaptersMenu({ chaptersText, chaptersTracks }: IMediaChapters) {
  const [id] = useId();

  const activeChaptersTrack = chaptersTracks.find(isActiveTrack);

  if (!activeChaptersTrack) {
    return null;
  }

  return (
    <Nav aria-labelledby={id}>
      <div id={id}>
        <AssistiveText>{activeChaptersTrack.label}</AssistiveText>
      </div>
      <ChaptersList
        activeText={chaptersText}
        chapters={activeChaptersTrack.cues}
      />
    </Nav>
  );
}

function mapState(state: IAianaState) {
  return {
    chaptersText: state.chapters.currentText,
    chaptersTracks: state.chapters.chaptersTracks
  };
}

export default connect(mapState)(withWidget(ChaptersMenu));
