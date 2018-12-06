import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAianaState } from '../reducers';

export type CDispatch = ThunkDispatch<IAianaState, undefined, AnyAction>;
