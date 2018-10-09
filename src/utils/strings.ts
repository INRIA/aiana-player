export function formatSubtitles(text: string): string[] {
  return text.split(/\n/).map((line) => line.trim());
}
