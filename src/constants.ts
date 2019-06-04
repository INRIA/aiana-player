import { IUIWindow } from './reducers/preferences';

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
export const DEFAULT_AUTOPLAY = false;
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
export const DEFAULT_PREVIOUS_CHAPTER_SEEK_THRESHOLD = 1.0;
export const DEFAULT_ACTIVE_FONT_FACE = 'system';
export const DEFAULT_FONT_FACES = [
  DEFAULT_ACTIVE_FONT_FACE,
  'verdana',
  'arial',
  'helvetica',
  'georgia',
  'times new roman'
];
export const DEFAULT_FONT_SIZE_MULTIPLIER = 1.0;
export const DEFAULT_TEXT_HIGHLIGHTING = false;
export const FONT_SIZE_MULTIPLIERS = [1.0, 1.2, 1.4, 1.6];
export const DEFAULT_LINE_HEIGHT = '1.5';
export const LINE_HEIGHT_VALUES = [
  '1',
  '1.1',
  '1.2',
  '1.3',
  '1.4',
  DEFAULT_LINE_HEIGHT,
  '1.6',
  '1.7',
  '1.8',
  '1.9',
  '2'
];

export const DEFAULT_WINDOWS_CONTAINER = '.aip-windows';

export const WINDOW_ID_CHAPTERS = 'chapters';
export const WINDOW_ID_ADDITIONAL_INFORMATION = 'additionalInformation';
export const WINDOW_ID_SLIDES = 'slides';
export const WINDOW_ID_VIDEO = 'video';
export const WINDOW_ID_TIME_MANAGEMENT = 'timeManagement';

export const DEFAULT_WINDOWS_LOCK = false;
export const DEFAULT_WINDOW_VISIBILITY = true;

export const DEFAULT_UI_WINDOWS: IUIWindow[] = [
  {
    height: 25,
    left: 65,
    locked: DEFAULT_WINDOWS_LOCK,
    name: 'additionalInformation',
    top: 0,
    visible: DEFAULT_WINDOW_VISIBILITY,
    width: 35
  },
  {
    height: 40,
    left: 50,
    locked: DEFAULT_WINDOWS_LOCK,
    name: 'chapters',
    top: 25,
    visible: DEFAULT_WINDOW_VISIBILITY,
    width: 50
  },
  {
    height: 100,
    left: 0,
    locked: DEFAULT_WINDOWS_LOCK,
    name: 'slides',
    top: 0,
    visible: DEFAULT_WINDOW_VISIBILITY,
    width: 50
  },
  {
    height: 25,
    left: 50,
    locked: DEFAULT_WINDOWS_LOCK,
    name: 'timeManagement',
    top: 0,
    visible: DEFAULT_WINDOW_VISIBILITY,
    width: 15
  },
  {
    height: 35,
    left: 50,
    locked: DEFAULT_WINDOWS_LOCK,
    name: 'video',
    top: 65,
    visible: DEFAULT_WINDOW_VISIBILITY,
    width: 50
  }
];

export const DEFAULT_MOVE_STEP = 5;
export const DEFAULT_FONT_MODIFIER_UPPERCASE = false;

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

// export const WORD_PATTERN = /\b([\w\u00C0-\u00FF]+[']?[\w\u00C0-\u00FF]+)/gi;
export const WORD_SEPARATOR = ' ';
