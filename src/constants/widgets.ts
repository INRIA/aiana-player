import { IWidget } from '../reducers/preferences';

export const WIDGET_ID_CHAPTERS = 'chapters';
export const WIDGET_ID_ADDITIONAL_INFORMATION = 'additionalInformation';
export const WIDGET_ID_SLIDES = 'slides';
export const WIDGET_ID_VIDEO = 'video';
export const WIDGET_ID_TIME_MANAGEMENT = 'timeManagement';
export const WIDGET_ID_SUBTITLES = 'subtitles';

export const WIDGETS_CONTAINER_CLASS = '.aip-widgets';
export const DEFAULT_WIDGETS_LOCK = false;
export const DEFAULT_WIDGET_VISIBILITY = true;

export const DEFAULT_WIDGETS: IWidget[] = [
  {
    height: 25,
    left: 65,
    locked: DEFAULT_WIDGETS_LOCK,
    name: WIDGET_ID_ADDITIONAL_INFORMATION,
    top: 0,
    visible: DEFAULT_WIDGET_VISIBILITY,
    width: 35
  },
  {
    height: 40,
    left: 50,
    locked: DEFAULT_WIDGETS_LOCK,
    name: WIDGET_ID_CHAPTERS,
    top: 25,
    visible: DEFAULT_WIDGET_VISIBILITY,
    width: 50
  },
  {
    height: 100,
    left: 0,
    locked: DEFAULT_WIDGETS_LOCK,
    name: WIDGET_ID_SLIDES,
    top: 0,
    visible: DEFAULT_WIDGET_VISIBILITY,
    width: 50
  },
  {
    height: 25,
    left: 50,
    locked: DEFAULT_WIDGETS_LOCK,
    name: WIDGET_ID_TIME_MANAGEMENT,
    top: 0,
    visible: DEFAULT_WIDGET_VISIBILITY,
    width: 15
  },
  {
    height: 35,
    left: 50,
    locked: DEFAULT_WIDGETS_LOCK,
    name: WIDGET_ID_VIDEO,
    top: 65,
    visible: DEFAULT_WIDGET_VISIBILITY,
    width: 50
  },
  {
    ghost: true,
    height: 20,
    left: 0,
    locked: DEFAULT_WIDGETS_LOCK,
    name: WIDGET_ID_SUBTITLES,
    top: 75,
    visible: DEFAULT_WIDGET_VISIBILITY,
    width: 100
  }
];
