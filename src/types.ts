import { ThunkAction } from 'redux-thunk';
import { IAianaState } from 'src/reducers';

// tslint:disable-next-line interface-name no-unused-variable
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

// tslint:disable-next-line interface-name
interface IHTMLElement {
  msRequestFullscreen(): Promise<void>;
  webkitRequestFullscreen(): Promise<void>;
}

export type ThunkResult<R> = ThunkAction<R, IAianaState, undefined, any>;
export type ExtendedHTMLElement = IHTMLElement & HTMLElement;
export type ExtendedDocument = IDocument & Document;
