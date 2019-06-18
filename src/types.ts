import { ThunkAction } from 'redux-thunk';
import { IAianaState } from './reducers';
import { AnyAction } from 'redux';

/**
 * Default `Document` interface is missing proprietary implementations and some
 * of the recently improved properties.
 * This interface adds the missing ones and enables compatibility with
 * all browsers.
 */
interface IDocument {
  mozFullScreenEnabled: boolean;
  msFullscreenEnabled: boolean;
  webkitFullscreenEnabled: boolean;

  fullscreenElement: HTMLElement;
  mozFullScreenElement: HTMLElement;
  msFullScreenElement: HTMLElement;
  webkitFullscreenElement: HTMLElement;

  msExitFullscreen(): any;
  webkitExitFullscreen(): any;
  mozCancelFullScreen(): any;
}

interface IHTMLElement {
  msRequestFullscreen(): any;
  webkitRequestFullscreen(): any;
}

export type ThunkResult<R> = ThunkAction<R, IAianaState, undefined, any>;
export type ExtendedHTMLElement = IHTMLElement & HTMLElement;
export type ExtendedDocument = IDocument & Document;

export type Direction = 'top' | 'right' | 'bottom' | 'left';

export interface IStdAction extends AnyAction {
  payload: any;
}
