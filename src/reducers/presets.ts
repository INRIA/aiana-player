import { Reducer } from 'redux';
import { LOAD_CONFIGURATION } from '../actions/shared';
import { IWidget } from './preferences';
import { CHANGE_ACTIVE_PRESET } from '../actions/presets';
import { IStdAction } from '../types';

export interface IPreset {
  fontFace: string;
  fontFaces: string[];
  fontUppercase: boolean;
  fontSizeMultiplier: number;
  fontSizeMultipliers: number[];
  language: string;
  languages: string[];
  lineHeight: number;
  lineHeightValues: number[];
  locked?: boolean;
  name: string;
  playbackRates: number[];
  previousChapterSeekThreshold: number;
  seekStep: number;
  seekStepMultiplier: number;
  selected?: boolean;
  textHighlighting: boolean;
  theme: string;
  themes: string[];
  volumeStep: number;
  volumeStepMultiplier: number;
  widgets: IWidget[];
}

const presets: Reducer<IPreset[], IStdAction> = (state = [], action) => {
  switch (action.type) {
    case CHANGE_ACTIVE_PRESET:
      return state.map((preset) => ({
        ...preset,
        selected: action.payload.preset
          ? preset.name === action.payload.preset.name
          : false
      }));
    case LOAD_CONFIGURATION: {
      const { presets: actionPresets = [] } = action.payload;
      return ([] as IPreset[]).concat(...state, actionPresets);
    }
    default:
      return state;
  }
};

export default presets;
