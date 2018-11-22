import { Reducer } from 'redux';
import {
  ADD_SLIDES_TRACK,
  SET_SLIDES_TEXT,
  UPDATE_ACTIVE_SLIDES_TRACK
} from 'src/actions/slides';
import { DEFAULT_LANG } from 'src/constants';
import { IRawSlidesTrack } from 'src/utils/media';

export interface ISlidesTrack {
  label?: string;
  src?: string;
  srcLang?: string;
}

export interface ISlidesState {
  currentSlideText?: string;
  language: string;
  slidesTracks: IRawSlidesTrack[];
  readonly sourceTracks: ISlidesTrack[];
}

const initialState: ISlidesState = {
  language: DEFAULT_LANG,
  slidesTracks: [],
  sourceTracks: [
    {
      label: 'Presentation Slides',
      src: 'http://localhost:3000/dev/en/slides.vtt',
      srcLang: 'en'
    },
    {
      label: 'Slides de Présentation',
      src: 'http://localhost:3000/dev/fr/slides.vtt',
      srcLang: 'fr'
    }
  ]
};

const slides: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SLIDES_TRACK:
      const slidesTracks = [].concat(state.slidesTracks as any, action.track);

      return {
        ...state,
        slidesTracks
      };
    case SET_SLIDES_TEXT:
      return {
        ...state,
        currentSlideText: action.text
      };
    case UPDATE_ACTIVE_SLIDES_TRACK:
      return {
        ...state,
        language: action.language
      };
    default:
      return state;
  }
};

export default slides;
