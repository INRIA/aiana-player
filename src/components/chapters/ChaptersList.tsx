import * as React from 'react';
import { IMediaCue } from '../../utils/media';
import MediaChapterButton from './MediaChapterButton';

interface IProps {
  chapters: IMediaCue[];
}

const ChaptersList: React.SFC<IProps> = ({ chapters }) => {
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

export default ChaptersList;
