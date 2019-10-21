import { Middleware } from 'redux';
import { PayloadAction } from 'redux-starter-kit';
import { getUserId } from '../utils/user';
import { IAianaState } from '../reducers';
import { updateWidget } from '../actions/shared/remote-loader';
import { updateActiveAdditionalInformationTrack } from '../actions/additional-information';
import { addBookmark } from '../actions/bookmarks';
import {
  previousChapter,
  nextChapter,
  updateActiveChaptersTrack
} from '../actions/chapters';
import {
  updateRating,
  seek,
  toggleFullscreenChangeAction,
  playMedia,
  pauseMedia,
  changePlaybackRate,
  changeVolume,
  toggleMute
} from '../actions/player';
import {
  importPreferencesAction,
  exportPreferences,
  changeMediaSource,
  updateLineHeight,
  changeActiveTheme,
  changeUILanguage,
  toggleFontUppercase,
  toggleTextHighlighting,
  updateFontSizeMultiplier,
  updateActiveFontFace,
  toggleWidgetVisibility,
  setWidgetsLock
} from '../actions/preferences';
import { updateActivePreset } from '../actions/presets';
import {
  previousSlide,
  nextSlide,
  updateActiveSlidesTrack
} from '../actions/slides';
import { updateActiveSubtitles } from '../actions/subtitles';

const loggedActions = [
  updateWidget.type,
  updateActiveAdditionalInformationTrack.type,
  addBookmark.type,
  previousChapter.type,
  nextChapter.type,
  updateActiveChaptersTrack.type,

  updateRating.type,
  seek.type,
  seek.type,
  toggleFullscreenChangeAction.type,
  playMedia.type,
  pauseMedia.type,
  changePlaybackRate.type,
  changeVolume.type,
  toggleMute.type,

  importPreferencesAction.type,
  exportPreferences.type,
  changeMediaSource.type,
  updateLineHeight.type,
  changeActiveTheme.type,
  changeUILanguage.type,
  toggleFontUppercase.type,
  toggleTextHighlighting.type,
  updateFontSizeMultiplier.type,
  updateActiveFontFace.type,
  toggleWidgetVisibility.type,
  setWidgetsLock.type,

  updateActivePreset.type,

  previousSlide.type,
  nextSlide.type,
  updateActiveSlidesTrack.type,

  updateActiveSubtitles.type
];

const analytics: Middleware = (store) => (next) => (
  action: PayloadAction<any>
) => {
  const result = next(action);

  if (loggedActions.includes(action.type)) {
    const state: IAianaState = store.getState();

    const playerEvent = {
      createdAt: Date.now(),
      eventName: action.type,
      mediaId: state.player.mediaId,
      player: {
        ...state.player
      },
      preferences: {
        ...state.preferences
      },
      userId: getUserId()
    };

    const strData = JSON.stringify(playerEvent);
    const loggerEndpoint = (window as any).loggerEndpoint;

    if (process.env.NODE_ENV !== 'production' && !loggerEndpoint) {
      console.log(strData);
    } else if (loggerEndpoint) {
      navigator.sendBeacon(loggerEndpoint, strData);
    }
  }

  return result;
};

export default analytics;
