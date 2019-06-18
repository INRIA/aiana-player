import Color from 'color';
import { IAianaTheme, themeFactory } from '.';

const theme: Partial<IAianaTheme> = {
  actionBg: '#0074d9', // blue
  actionFg: '#fff',
  bg: '#111',
  clearFg: Color('#eee')
    .lighten(0.3)
    .string(),
  fg: '#eee',
  focus: '#0070d2',
  highlight: '#ff0',
  main: '#e63312' // red
};

export default themeFactory(theme);
