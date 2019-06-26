import { Reducer } from 'redux';
import { LOAD_CONFIGURATION } from '../actions/shared';
import { IWidget } from './preferences';
import { CHANGE_ACTIVE_PRESET } from '../actions/presets';
import { IStdAction } from '../types';
import { BASE_PRESETS } from '../constants/presets';

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

      const prevPresets = concatPresets(
        [...(BASE_PRESETS as IPreset[])],
        [...state]
      );

      const deduped = dedupPresets(prevPresets, actionPresets);

      return concatPresets(prevPresets, deduped);
    }
    default:
      return state;
  }
};

export function getActivePreset(state: IPreset[]): IPreset | undefined {
  return state.find((p) => p.selected === true);
}

export default presets;
