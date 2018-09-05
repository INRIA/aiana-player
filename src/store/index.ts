import { AnyAction, Dispatch } from 'redux';

export interface IConnectedReduxProps {
  // Correct types for the `dispatch` prop passed by `react-redux`.
  // Additional type information is given through generics.
  dispatch: Dispatch<AnyAction>;
}

export interface IState {
  player: any;
}

export const initialState: IState = {
  player: {
    isFullscreen: false,
    isPlaying: false,
    playerElement: null,
    videoElement: null
  }
};
