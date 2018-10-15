export function enterFullscreen(element: HTMLElement): void {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

export function exitFullscreen(): void {
  document.exitFullscreen();
}

export function hasFullscreenElement(): boolean {
  if (document.fullscreenElement) {
    return true;
  }

  return false;
}

export function isFullscreenEnabled(): boolean {
  return document.fullscreenEnabled;
}

export function isDocumentFullscreen(): boolean {
  return document.fullscreen;
}
