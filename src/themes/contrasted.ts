import Color from 'color';
import { IAianaTheme, themeFactory } from '.';

const theme: Partial<IAianaTheme> = {
  bg: '#000',
  clearFg: Color('#fff')
    .lighten(0.3)
    .string(),
  fg: '#fff',
  focus: '#fff',
  highlight: '#ccc',
  main: '#fff'
};

export default themeFactory(theme);
