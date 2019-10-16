import { Middleware } from 'redux';
import { PayloadAction } from 'redux-starter-kit';
import { loadConfiguration } from '../actions/shared/configuration';
import { setSubtitlesText } from '../actions/subtitles';
import { getUserId } from '../utils/user';
import { IAianaState } from '../reducers';

// TODO: what actions should be monitored?
const loggedActions = [loadConfiguration.type, setSubtitlesText.type];

const analytics: Middleware = (store) => (next) => (
  action: PayloadAction<any>
) => {
  if (loggedActions.includes(action.type)) {
    const state: IAianaState = store.getState();
    const partialState = {
      ...state.player,
      ...state.preferences
    };

    const playerEvent = {
      createdAt: Date.now(),
      mediaId: state.player.mediaId,
      payload: action.payload,
      state: partialState,
      type: action.type,
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

  return next(action);
};

export default analytics;
