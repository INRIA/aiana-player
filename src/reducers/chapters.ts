import { Reducer } from 'redux';
import { ADD_CHAPTER_TRACK } from 'src/actions/chapters';
import { IRawChapterTrack } from 'src/utils/media';

export interface IChaptersTrack {
  label: string;
  src: string;
  srcLang: string;
}

export interface IChaptersState {
  chaptersTracks: IRawChapterTrack[];
  menuEnabled: boolean;
  readonly sources: IChaptersTrack[];
}

const initialState = {
  chaptersTracks: [],
  menuEnabled: true,
  sources: [
    {
      label: 'Chapitres',
      src: 'http://localhost:3000/dev/chapters.fr.vtt',
      srcLang: 'fr'
    },
    {
      label: 'Chapters',
      src: 'http://localhost:3000/dev/chapters.en.vtt',
      srcLang: 'en'
    }
  ]
};

const chapters: Reducer = (state: IChaptersState = initialState, action) => {
  switch (action.type) {
    case ADD_CHAPTER_TRACK: {
      const chaptersTracks = [].concat(
        state.chaptersTracks as any,
        action.chaptersTrack
      );

      return {
        ...state,
        chaptersTracks
      };
    }
    default:
      return state;
  }
};

export default chapters;
