import React from 'react';
import { IMediaCue } from '../../utils/media';
import MediaChapterButton from './MediaChapterButton';
import classNames from 'classnames';

interface IProps {
  activeText?: string;
  chapters: IMediaCue[];
}

function ChaptersList({ activeText, chapters }: IProps) {
  if (chapters.length === 0) {
    return null;
  }

  return (
    <ol>
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
    </ol>
  );
}

export default ChaptersList;
