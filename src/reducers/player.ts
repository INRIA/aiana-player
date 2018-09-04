import { Reducer } from 'redux';
import { PLAYER_ELEMENT_MOUNTED, TOGGLE_FULLSCREEN } from '../actions/player';

const player: Reducer = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_FULLSCREEN:
      return {
        ...state,
        isFullscreen: !state.isFullscreen
      };
    case PLAYER_ELEMENT_MOUNTED:
      return {
        ...state,
        playerElement: action.playerElement
      };
    default:
      return state;
  }
};

export default player;
