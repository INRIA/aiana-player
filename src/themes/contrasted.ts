import Color from 'color';
import { IAianaTheme } from '../utils/styled-components';

const theme: IAianaTheme = {
  bg: '#000',
  clearFg: Color('#fff')
    .lighten(0.3)
    .string(),
  fg: '#fff',
  focus: '#fff',
  highlight: '#ccc',
  main: '#fff'
};

export default theme;
