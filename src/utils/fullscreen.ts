import { ExtendedDocument, ExtendedHTMLElement } from 'src/types';

export function enterFullscreen(element: ExtendedHTMLElement): Promise<void> {
  if (element.webkitRequestFullscreen) {
    return element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    return element.msRequestFullscreen();
  }

  return element.requestFullscreen();
}

export function exitFullscreen(): Promise<void> {
  const doc = document as ExtendedDocument;

  if (doc.webkitExitFullscreen) {
    return doc.webkitExitFullscreen();
  } else if (doc.mozCancelFullScreen) {
    return doc.mozCancelFullScreen();
  } else if (doc.msExitFullscreen) {
    return doc.msExitFullscreen();
  }

  return doc.exitFullscreen();
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
