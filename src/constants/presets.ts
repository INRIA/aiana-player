import { IPreset } from '../reducers/presets';
import { DEFAULT_WIDGETS } from './widgets';

export const BASE_PRESETS: Partial<IPreset>[] = [
  {
    locked: true,
    name: 'default',
    widgets: [...DEFAULT_WIDGETS]
  },
  {
    fontFace: 'system',
    fontSizeMultiplier: 1,
    fontUppercase: false,
    lineHeight: 1.5,
    locked: true,
    name: 'video',
    previousChapterSeekThreshold: 1,
    seekStep: 5,
    seekStepMultiplier: 2,
    textHighlighting: false,
    theme: 'inria',
    volumeStep: 0.1,
    volumeStepMultiplier: 2,
    widgets: [
      {
        height: 25,
        left: 65,
        locked: false,
        name: 'additionalInformation',
        top: 0,
        visible: false,
        width: 35
      },
      {
        height: 40,
        left: 50,
        locked: false,
        name: 'chapters',
        top: 25,
        visible: false,
        width: 50
      },
      {
        height: 100,
        left: 0,
        locked: false,
        name: 'slides',
        top: 0,
        visible: false,
        width: 50
      },
      {
        height: 25,
        left: 50,
        locked: false,
        name: 'timeManagement',
        top: 0,
        visible: false,
        width: 15
      },
      {
        height: 100,
        left: 0,
        locked: true,
        name: 'video',
        top: 0,
        visible: true,
        width: 100
      },
      {
        ghost: true,
        height: 20,
        left: 0,
        locked: true,
        name: 'subtitles',
        top: 75,
        visible: true,
        width: 100
      },
      {
        height: 100,
        left: 50,
        locked: false,
        name: 'transcript',
        top: 0,
        visible: false,
        width: 50
      }
    ]
  },
  {
    fontFace: 'system',
    fontSizeMultiplier: 1,
    fontUppercase: false,
    lineHeight: 1.5,
    locked: true,
    name: 'mooc',
    previousChapterSeekThreshold: 1,
    seekStep: 5,
    seekStepMultiplier: 2,
    textHighlighting: false,
    theme: 'inria',
    volumeStep: 0.1,
    volumeStepMultiplier: 2,
    widgets: [
      {
        height: 25,
        left: 50,
        locked: true,
        name: 'additionalInformation',
        top: 0,
        visible: true,
        width: 50
      },
      {
        height: 40,
        left: 50,
        locked: true,
        name: 'chapters',
        top: 25,
        visible: true,
        width: 50
      },
      {
        height: 100,
        left: 0,
        locked: true,
        name: 'slides',
        top: 0,
        visible: true,
        width: 50
      },
      {
        height: 25,
        left: 50,
        locked: true,
        name: 'timeManagement',
        top: 0,
        visible: false,
        width: 15
      },
      {
        height: 35,
        left: 50,
        locked: true,
        name: 'video',
        top: 65,
        visible: true,
        width: 50
      },
      {
        ghost: true,
        height: 20,
        left: 0,
        locked: true,
        name: 'subtitles',
        top: 75,
        visible: true,
        width: 100
      },
      {
        height: 100,
        left: 50,
        locked: false,
        name: 'transcript',
        top: 0,
        visible: false,
        width: 50
      }
    ]
  },
  {
    fontFace: 'verdana',
    fontSizeMultiplier: 1.2,
    fontUppercase: true,
    language: 'fr',
    lineHeight: 1.4,
    locked: true,
    name: 'all on',
    previousChapterSeekThreshold: 3,
    seekStep: 10,
    seekStepMultiplier: 3,
    textHighlighting: true,
    theme: 'contrasted',
    volumeStep: 0.5,
    volumeStepMultiplier: 2,
    widgets: [
      {
        height: 25,
        left: 65,
        locked: true,
        name: 'additionalInformation',
        top: 0,
        visible: false,
        width: 35
      },
      {
        height: 40,
        left: 50,
        locked: true,
        name: 'chapters',
        top: 25,
        visible: false,
        width: 50
      },
      {
        height: 100,
        left: 0,
        locked: true,
        name: 'slides',
        top: 0,
        visible: true,
        width: 50
      },
      {
        height: 25,
        left: 50,
        locked: true,
        name: 'timeManagement',
        top: 0,
        visible: false,
        width: 15
      },
      {
        height: 100,
        left: 50,
        locked: true,
        name: 'video',
        top: 0,
        visible: true,
        width: 50
      },
      {
        ghost: true,
        height: 20,
        left: 0,
        locked: true,
        name: 'subtitles',
        top: 75,
        visible: true,
        width: 100
      },
      {
        height: 100,
        left: 50,
        locked: false,
        name: 'transcript',
        top: 0,
        visible: false,
        width: 50
      }
    ]
  }
];
