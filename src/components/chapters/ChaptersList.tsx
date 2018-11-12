import * as React from 'react';
import MediaChapterButton from './MediaChapterButton';

interface IChapter {
  endTime: number;
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

export default ChaptersList;
