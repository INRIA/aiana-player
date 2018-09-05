export function enterFullscreen(element: HTMLElement): void {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

export function exitFullscreen(): void {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

export function hasFullscreenElement(): boolean {
  if (document.fullscreenElement || document.webkitFullscreenElement) {
    return true;
  }

  return false;
}

export function isFullscreenEnabled(): boolean {
  return document.fullscreenEnabled || document.webkitFullscreenEnabled;
}

export function isDocumentFullscreen(): boolean {
  return document.webkitIsFullScreen;
}
