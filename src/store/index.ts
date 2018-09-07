import { AnyAction, Dispatch } from 'redux';

export interface IConnectedReduxProps {
  // Correct types for the `dispatch` prop passed by `react-redux`.
  // Additional type information is given through generics.
  dispatch: Dispatch<AnyAction>;
}

export interface IState {
  player: IPlayerState;
}

export interface IPlayerState {
  isFullscreen: boolean;
  isPlaying: boolean;
  playerElement: HTMLElement | null;
  videoElement: HTMLVideoElement | null;
}
