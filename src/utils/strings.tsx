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

type Adapter<T> = (input: T) => T;

export function identity<T>(input: T) {
  return input;
}

/**
 * Converts input string (markdown, HTML) a JSX element.
 */
export function markdownToJSX(md: string): ReactElement<any> {
  return unsafeJSX(marked)(md);
}

export function markdownToJSXForReadability(md: string): ReactElement<any> {
  return unsafeJSX(colored)(md);
}

function replacer(match: string) {
  return `<span class="aip-hl">${match}</span>`;
}

function colored(content: string): string {
  const pattern = /\b([\w\u00C0-\u00FF]+[']?[\w\u00C0-\u00FF]+)(?!>)/gi;
  const separator = ' ';

  // console.log(marked(content).split(separator));

  return marked(content)
    .split(separator)
    .reduce(function(acc, current) {
      return `${acc}${separator}${current.replace(pattern, replacer)}`;
    }, '');
}

function unsafeJSX(adapter: Adapter<string> = identity) {
  return (content: string): ReactElement<any> => (
    <div
      className="aip-marked"
      dangerouslySetInnerHTML={{ __html: adapter(content) }}
    />
  );
}
