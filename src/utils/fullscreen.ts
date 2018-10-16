import { ExtendedDocument, ExtendedHTMLElement } from 'src/types';

export function enterFullscreen(element: ExtendedHTMLElement): void {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

export function exitFullscreen(): void {
  const doc = document as ExtendedDocument;

  if (doc.exitFullscreen) {
    doc.exitFullscreen();
  } else if (doc.webkitExitFullscreen) {
    doc.webkitExitFullscreen();
  } else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen();
  } else if (doc.msExitFullscreen) {
    doc.msExitFullscreen();
  }
}

export function isDocumentFullscreen(): boolean {
  const doc = document as ExtendedDocument;

  if (
    doc.fullscreenElement ||
    doc.mozFullScreenElement ||
    doc.msFullScreenElement ||
    doc.webkitFullscreenElement
  ) {
    return true;
  }

  return false;
}

export function isFullscreenEnabled(): boolean {
  const doc = document as ExtendedDocument;

  return (
    doc.fullscreenEnabled ||
    doc.webkitFullscreenEnabled ||
    doc.mozFullScreenEnabled ||
    doc.msFullscreenEnabled
  );
}
