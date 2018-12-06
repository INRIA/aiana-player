import * as marked from 'marked';
import * as React from 'react';

marked.setOptions({
  headerIds: false
});

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

export function markdownToJSX(md: string): JSX.Element {
  const htmlContent = marked(md);

  return (
    <div
      className="aip-marked"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
