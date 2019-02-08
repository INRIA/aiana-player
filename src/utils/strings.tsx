import React from 'react';
import marked from './marked';

/**
 * Format input string to be displayed as single or multiline subtitles.
 */
export function formatSubtitles(
  text: string,
  singleLine: boolean = false
): string[] {
  const cleanedText = text.split(/\n/).map((line) => line.trim());

  if (!singleLine) {
    return cleanedText;
  } else {
    return [cleanedText.join(' ')];
  }
}

type Adapter = (input: string) => string;

function identity(input: string) {
  return input;
}

/**
 * Converts input string (markdown, HTML) a JSX element.
 */
export function markdownToJSX(md: string): JSX.Element {
  return unsafeJSX(marked)(md);
}

function unsafeJSX(adapter: Adapter = identity) {
  return (content: string): JSX.Element => (
    <div
      className="aip-marked"
      dangerouslySetInnerHTML={{ __html: adapter(content) }}
    />
  );
}
