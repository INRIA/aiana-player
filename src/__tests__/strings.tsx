import { mount } from 'enzyme';
import { formatSubtitles, markdownToJSX, identity } from '../utils/strings';

test('identity function', () => {
  const str = 'a string';
  const num = 123;
  const obj = { prop: 'value' };

  expect(identity(str)).toEqual(str);
  expect(identity(num)).toEqual(num);
  expect(identity(obj)).toEqual(obj);
});

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
