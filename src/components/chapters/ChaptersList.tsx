import React from 'react';
import styled from '../../utils/styled-components';
import { IMediaCue } from '../../utils/media';
import MediaChapterButton from './MediaChapterButton';
import classNames from 'classnames';

interface IProps {
  activeText?: string;
  chapters: IMediaCue[];
}

const Ol = styled.ol`
  margin: 0;

  .active button {
    font-weight: bold;
  }
`;

function ChaptersList({ activeText, chapters }: IProps) {
  if (chapters.length === 0) {
    return null;
  }

  return (
    <Ol>
      {chapters.map(({ startTime, text }, idx) => (
        <li key={idx} className={classNames({ active: text === activeText })}>
          <MediaChapterButton
            isActive={text === activeText}
            startTime={startTime}
          >
            {text}
          </MediaChapterButton>
        </li>
      ))}
    </Ol>
  );
}

export default ChaptersList;
