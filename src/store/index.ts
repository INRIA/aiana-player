import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAianaState } from 'src/reducers';

export type CDispatch = ThunkDispatch<IAianaState, undefined, AnyAction>;

export interface IConnectedReduxProps {
  // Correct types for the `dispatch` prop passed by `react-redux`.
  // Additional type information is given through generics.
  dispatch: CDispatch;
}
