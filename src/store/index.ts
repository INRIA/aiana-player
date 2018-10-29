import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAianaState } from 'src/reducers';

export type CDispatch = ThunkDispatch<IAianaState, undefined, AnyAction>;
