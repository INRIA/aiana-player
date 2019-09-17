import React from 'react';
import { connect } from 'react-redux';
import withWidget from '../../hocs/with-widget';
import withUniqueId, { IInjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';
import { IRawTrack, isActiveTrack } from '../../utils/media';
import AssistiveText from '../a11y/AssistiveText';
import ChaptersList from './ChaptersList';
import styled from '../../utils/styled-components';

export interface IMediaChapters {
  chaptersText?: string;
  chaptersTracks: IRawTrack[];
}

interface IProps extends IMediaChapters, IInjectedUniqueIdProps {}

const Nav = styled.nav`
  width: 100%;

  padding: 1em;

  display: flex;
  flex-direction: column;
  justify-content: center;

  color: ${(props) => props.theme.bg};
  background-color: ${(props) => props.theme.fg};
`;

function ChaptersMenu({ chaptersText, chaptersTracks, uid }: IProps) {
  const activeChaptersTrack = chaptersTracks.find(isActiveTrack);

  if (!activeChaptersTrack) {
    return null;
  }

  return (
    <Nav aria-labelledby={uid}>
      <div id={uid}>
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

export default connect(mapState)(withWidget(withUniqueId(ChaptersMenu)));
