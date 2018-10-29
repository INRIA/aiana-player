import * as marked from 'marked';
import * as React from 'react';

marked.setOptions({
  headerIds: false
});

export function formatSubtitles(text: string): string[] {
  return text.split(/\n/).map((line) => line.trim());
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
