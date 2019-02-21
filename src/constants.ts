import { IUIPlacement } from './reducers/preferences';

export const SECONDS_PER_HOUR = 3600;
export const MINUTES_PER_HOUR = 60;
export const SECONDS_PER_MINUTE = 60;

export const DIRECTION_TOP = 'top';
export const DIRECTION_RIGHT = 'right';
export const DIRECTION_BOTTOM = 'bottom';
export const DIRECTION_LEFT = 'left';

// Key codes
export const ARROW_UP_KEY = 'ArrowUp';
export const ARROW_RIGHT_KEY = 'ArrowRight';
export const ARROW_DOWN_KEY = 'ArrowDown';
export const ARROW_LEFT_KEY = 'ArrowLeft';
export const HOME_KEY = 'Home';
export const END_KEY = 'End';
export const PAGE_UP_KEY = 'PageUp';
export const PAGE_DOWN_KEY = 'PageDown';
export const ESCAPE_KEY = 'Escape';

export const VOLUME_MINIMUM = 0;
export const VOLUME_MAXIMUM = 1;

export const DEFAULT_CONFIGURATION_PATH = './configuration.json';
export const DEFAULT_AVAILABLE_LANGUAGES = ['en', 'fr'];
export const DEFAULT_LANG = 'en';
export const DEFAULT_MENU_ENABLED = true;
export const DEFAULT_MUTED = false;
export const DEFAULT_PLAYBACK_RATE = 1;
export const DEFAULT_PRELOAD = 'auto';
export const DEFAULT_SEEK_STEP = 5;
export const DEFAULT_SEEK_STEP_MULTIPLIER = 2;
export const DEFAULT_THEME = 'inria';
export const DEFAULT_VOLUME = VOLUME_MAXIMUM;
export const DEFAULT_VOLUME_STEP = 0.1;
export const DEFAULT_VOLUME_STEP_MULTIPLIER = 2;

export const DEFAULT_DRAGGABLE_SELECTOR = '.aip-player';

export const WINDOW_ID_CHAPTERS = 'chapters';
export const WINDOW_ID_ADDITIONAL_INFORMATION = 'additionalInformation';
export const WINDOW_ID_SLIDES = 'slides';
export const WINDOW_ID_VIDEO = 'video';

export const DEFAULT_UI_PLACEMENT: IUIPlacement = {
  additionalInformation: {
    height: 30,
    left: 50,
    top: 0,
    width: 30
  },
  chapters: {
    height: 30,
    left: 0,
    top: 50,
    width: 30
  },
  slides: {
    height: 35,
    left: 5,
    top: 5,
    width: 35
  },
  video: {
    height: 30,
    left: 50,
    top: 50,
    width: 30
  }
};

export const DEFAULT_MOVE_STEP = 5;

export const INACTIVITY_TIMER_DURATION = 3000;
export const INACTIVITY_EVENTS = [
  'click',
  'contextmenu',
  'mousedown',
  'mouseenter',
  'mousemove',
  'mouseup',
  'keydown',
  'keypress',
  'keyup'
];

export const AVAILABLE_PLAYBACK_RATES = [
  0.25,
  0.5,
  0.75,
  1,
  1.25,
  1.5,
  1.75,
  2
];
export const AVAILABLE_THEMES = ['inria', 'contrasted', 'inverted'];

export const I18N_DURATION_HOURS_MINUTES_SECONDS_KEY = 'time.duration.hms';
export const I18N_DURATION_HOURS_MINUTES_KEY = 'time.duration.hm';
export const I18N_DURATION_HOURS_SECONDS_KEY = 'time.duration.hs';
export const I18N_DURATION_HOURS_KEY = 'time.duration.h';
export const I18N_DURATION_MINUTES_SECONDS_KEY = 'time.duration.ms';
export const I18N_DURATION_MINUTES_KEY = 'time.duration.m';
export const I18N_DURATION_SECONDS_KEY = 'time.duration.s';

export const TRACK_KIND_SUBTITLES = 'subtitles';
export const TRACK_KIND_CAPTIONS = 'captions';
export const TRACK_KIND_CHAPTERS = 'chapters';
export const TRACK_KIND_METADATA = 'metadata';

export const TRACK_MODE_ACTIVE = 'showing';
export const TRACK_MODE_HIDDEN = 'hidden';
