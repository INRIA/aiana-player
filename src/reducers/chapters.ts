import { Reducer } from 'redux';
import {
  ADD_CHAPTER_TRACK,
  UPDATE_ACTIVE_CHAPTERS_TRACK
} from 'src/actions/chapters';
import { DEFAULT_LANG } from 'src/constants';
import { IRawChaptersTrack } from 'src/utils/media';

export interface IChaptersTrack {
  label: string;
  src: string;
  srcLang: string;
}

export interface IChaptersState {
  chaptersTracks: IRawChaptersTrack[];
  language: string;
  menuEnabled: boolean;
  readonly sources: IChaptersTrack[];
}

const initialState: IChaptersState = {
  chaptersTracks: [],
  language: DEFAULT_LANG,
  menuEnabled: true,
  sources: [
    {
      label: 'Chapitres',
      src: 'http://localhost:3000/dev/fr/chapters.vtt',
      srcLang: 'fr'
    },
    {
      label: 'Chapters',
      src: 'http://localhost:3000/dev/en/chapters.vtt',
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
    case UPDATE_ACTIVE_CHAPTERS_TRACK:
      return {
        ...state,
        language: action.language
      };
    default:
      return state;
  }
};

export default chapters;
