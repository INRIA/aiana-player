import React, { ReactElement } from 'react';
import marked from './marked';
import { WORD_SEPARATOR } from '../constants';

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

function getTextNodes(el: ChildNode): ChildNode[] {
  return [...el.childNodes].reduce((acc, curNode) => {
    if (curNode.nodeType === 1 && curNode.hasChildNodes()) {
      return (acc as any).concat(getTextNodes(curNode));
    }

    if (
      curNode.nodeType === 3 &&
      curNode.textContent &&
      curNode.textContent.trim().length > 0
    ) {
      return (acc as any).concat(curNode);
    }

    return acc;
  }, []);
}

function createWordElement(text = ''): HTMLElement {
  const el = document.createElement('span');
  el.className = 'aip-word';
  el.innerText = text;

  return el;
}

// TODO: refactor this function into clearer parts.
function colored(content: string): string {
  const htmlContent = document.createElement('div');
  htmlContent.innerHTML = marked(content);

  const textNodes = getTextNodes(htmlContent as ChildNode);

  [...textNodes].forEach((textNode) => {
    const text = textNode.textContent!.trim() || '';
    const parent = textNode.parentNode!;
    text
      .split(WORD_SEPARATOR)
      .map(createWordElement)
      .forEach((wordEl) => {
        parent.insertBefore(wordEl, textNode);
        parent.insertBefore(document.createTextNode(WORD_SEPARATOR), textNode);
      });
    parent.removeChild(textNode);
  });

  return htmlContent.innerHTML;
}

function unsafeJSX(adapter: Adapter<string> = identity) {
  return (content: string): ReactElement<any> => (
    <div
      className="aip-marked"
      dangerouslySetInnerHTML={{ __html: adapter(content) }}
    />
  );
}
