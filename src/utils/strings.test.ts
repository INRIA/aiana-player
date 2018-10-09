import { formatSubtitles } from './strings';

describe('format subtitles', () => {
  test('with single line string', () => {
    expect(formatSubtitles('hello')).toEqual(['hello']);
    expect(formatSubtitles('hello   ')).toEqual(['hello']);
    expect(formatSubtitles('   hello')).toEqual(['hello']);
    expect(formatSubtitles('   hello   ')).toEqual(['hello']);
  });

  test('with multiline string', () => {
    const text = `Hello, world!
    This is a multiline string.`;
    const result = ['Hello, world!', 'This is a multiline string.'];

    expect(formatSubtitles(text)).toEqual(result);
    expect(formatSubtitles(`    ${text}`)).toEqual(result);
    expect(formatSubtitles(`${text}    `)).toEqual(result);
    expect(formatSubtitles(`    ${text}    `)).toEqual(result);
  });
});
