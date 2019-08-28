import { IWidget } from './preferences';
import { updateActivePreset } from '../actions/presets';
import { BASE_PRESETS } from '../constants/presets';
import { createReducer } from 'redux-starter-kit';
import { loadConfiguration } from '../actions/shared/configuration';

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

function emptyPresetsList() {
  return [] as IPreset[];
}

function dedupPresets(
  trustedPresets: IPreset[],
  presets: IPreset[]
): IPreset[] {
  return presets.reduce((acc, preset) => {
    if (trustedPresets.find((p) => p.name === preset.name)) {
      return acc;
    }

    return emptyPresetsList().concat(acc, preset);
  }, emptyPresetsList());
}

function concatPresets(...presets: IPreset[][]): IPreset[] {
  return emptyPresetsList().concat(...presets);
}

const presetsReducer = createReducer([] as IPreset[], {
  [updateActivePreset.toString()]: (state: IPreset[], action) => {
    return state.map((preset) => ({
      ...preset,
      selected: action.payload ? preset.name === action.payload.name : false
    }));
  },
  [loadConfiguration.toString()]: (state: IPreset[], action) => {
    const { presets: actionPresets = [] } = action.payload;

    const prevPresets = concatPresets(
      [...(BASE_PRESETS as IPreset[])],
      [...state]
    );

    const deduped = dedupPresets(prevPresets, actionPresets);

    return concatPresets(prevPresets, deduped);
  }
});

export function getActivePreset(state: IPreset[]): IPreset | undefined {
  return state.find((p) => p.selected === true);
}

export default presetsReducer;
