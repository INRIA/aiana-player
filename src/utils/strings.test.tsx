import { mount } from 'enzyme';
import { formatSubtitles, markdownToJSX } from './strings';

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

  test('should return single line string', () => {
    const text = `Hello, world!
    This is a multiline string.`;
    const result = ['Hello, world! This is a multiline string.'];

    expect(formatSubtitles(text, true)).toEqual(result);
    expect(formatSubtitles(`    ${text}`, true)).toEqual(result);
    expect(formatSubtitles(`${text}    `, true)).toEqual(result);
    expect(formatSubtitles(`    ${text}    `, true)).toEqual(result);
  });
});

describe('markdown to JSX', () => {
  const wrapper = mount(markdownToJSX('# Hello, World!'));

  it('mounts properly', () => {
    expect(wrapper.html()).toContain('Hello, World!');
  });

  it('has proper class name', () => {
    expect(wrapper.hasClass('aip-marked')).toBe(true);
  });
});
