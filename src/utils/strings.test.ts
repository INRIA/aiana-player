import { formatSubtitles } from './strings';

describe('format subtitles', () => {
  test('with single line string', () => {
    const word = 'hello';
    const result = [word];
    expect(formatSubtitles(word)).toEqual(result);
    expect(formatSubtitles(`${word}   `)).toEqual(result);
    expect(formatSubtitles(`   ${word}`)).toEqual(result);
    expect(formatSubtitles(`   ${word}   `)).toEqual(result);
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
