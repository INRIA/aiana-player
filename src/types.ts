// tslint:disable-next-line interface-name
interface Document {
  webkitFullscreenEnabled: boolean;

  fullscreenElement(): Promise<void>;
  mozFullScreenElement(): Promise<void>;
  msFullScreenElement(): Promise<void>;
  webkitFullscreenElement(): Promise<void>;
}

// tslint:disable-next-line interface-name
interface HTMLElement {
  msRequestFullscreen(): Promise<void>;
  webkitRequestFullscreen(): Promise<void>;
}
