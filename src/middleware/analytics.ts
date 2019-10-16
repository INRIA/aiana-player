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

    const playerEvent = {
      createdAt: Date.now(),
      payload: action.payload,
      mediaId: state.player.mediaId,
      state,
      type: action.type,
      userId: getUserId()
    };

    const strData = JSON.stringify(playerEvent);

    if (process.env.NODE_ENV !== 'production') {
      console.log(strData);
    } else {
      const loggerEndpoint = (window as any).loggerEndpoint;
      const blob = new Blob([strData], {
        type: 'application/json; charset=UTF-8'
      });

      if (loggerEndpoint) {
        navigator.sendBeacon(loggerEndpoint, blob);
      }
    }
  }

  return next(action);
};

export default analytics;
