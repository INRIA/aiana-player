import { Reducer } from 'redux';
import { TOGGLE_FULLSCREEN } from '../actions/player';

const player: Reducer = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_FULLSCREEN:
      return {
        ...state,
        isFullscreen: !state.isFullscreen
      };
    default:
      return state;
  }
};

export default player;
