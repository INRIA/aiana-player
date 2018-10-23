import { ThunkAction } from 'redux-thunk';
import { IAianaState } from 'src/reducers';

/**
 * Default `Document` interface is missing proprietary implementations and some
 * of the recently improved properties.
 * This interface adds the missing ones and enables compatibility with
 * all browsers.
 */
interface IDocument extends Document {
  mozFullScreenEnabled: boolean;
  msFullscreenEnabled: boolean;
  webkitFullscreenEnabled: boolean;

  fullscreenElement: HTMLElement;
  mozFullScreenElement: HTMLElement;
  msFullScreenElement: HTMLElement;
  webkitFullscreenElement: HTMLElement;

  msExitFullscreen(): Promise<void>;
  webkitExitFullscreen(): Promise<void>;
  mozCancelFullScreen(): Promise<void>;
}

interface IHTMLElement {
  msRequestFullscreen(): Promise<void>;
  webkitRequestFullscreen(): Promise<void>;
}

export type ThunkResult<R> = ThunkAction<R, IAianaState, undefined, any>;
export type ExtendedHTMLElement = IHTMLElement & HTMLElement;
export type ExtendedDocument = IDocument & Document;
