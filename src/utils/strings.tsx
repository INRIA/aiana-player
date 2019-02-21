import React, { ReactElement } from 'react';
import marked from './marked';

/**
 * Format input string to be displayed as single or multiline subtitles.
 */
export function formatSubtitles(
  text: string,
  singleLine: boolean = false
): string[] {
  const trimmedTextLines = text.split(/\n/).map((line) => line.trim());

  if (!singleLine) {
    return trimmedTextLines;
  } else {
    return [trimmedTextLines.join(' ')];
  }
}

type Adapter = (input: string) => string;

function identity(input: string) {
  return input;
}

/**
 * Converts input string (markdown, HTML) a JSX element.
 */
export function markdownToJSX(md: string): ReactElement<any> {
  return unsafeJSX(marked)(md);
}

function unsafeJSX(adapter: Adapter = identity) {
  return (content: string): ReactElement<any> => (
    <div
      className="aip-marked"
      dangerouslySetInnerHTML={{ __html: adapter(content) }}
    />
  );
}
