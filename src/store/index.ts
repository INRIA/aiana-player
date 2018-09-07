import { AnyAction, Dispatch } from 'redux';

export interface IConnectedReduxProps {
  // Correct types for the `dispatch` prop passed by `react-redux`.
  // Additional type information is given through generics.
  dispatch: Dispatch<AnyAction>;
}
