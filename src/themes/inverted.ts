import Color from 'color';
import { themeFactory, IAianaTheme } from '.';

const theme: Partial<IAianaTheme> = {
  bg: '#fff',
  clearFg: Color('#000')
    .lighten(0.3)
    .string(),
  fg: '#000',
  focus: '#000',
  highlight: '#444',
  main: '#000'
};

export default themeFactory(theme);
