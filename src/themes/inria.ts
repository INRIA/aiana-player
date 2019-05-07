import Color from 'color';
import { IAianaTheme } from '../utils/styled-components';

const theme: IAianaTheme = {
  bg: '#111',
  clearFg: Color('#eee')
    .lighten(0.3)
    .string(),
  fg: '#eee',
  focus: '#0070d2',
  highlight: '#ff0',
  main: '#e63312'
};

export default theme;
