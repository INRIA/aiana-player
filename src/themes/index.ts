import contrasted from './contrasted';
import inria from './inria';
import inverted from './inverted';

export interface IBaseColors {
  aqua: string;
  black: string;
  blue: string;
  fuchsia: string;
  gray: string;
  green: string;
  lime: string;
  maroon: string;
  navy: string;
  olive: string;
  orange: string;
  purple: string;
  red: string;
  silver: string;
  teal: string;
  white: string;
  yellow: string;
}

export interface IAianaTheme {
  [prop: string]: any;

  colors: IBaseColors;
}

export function themeFactory(
  theme: Partial<IAianaTheme>,
  base = {
    colors: {
      aqua: '#7fdbff',
      black: '#111111',
      blue: '#0074d9',
      fuchsia: '#f012be',
      gray: '#aaaaaa',
      green: '#2ecc40',
      lime: '#01ff70',
      maroon: '#85144b',
      navy: '#001f3f',
      olive: '#3d9970',
      orange: '#ff851b',
      purple: '#b10dc9',
      red: '#ff4136',
      silver: '#dddddd',
      teal: '#39cccc',
      white: '#ffffff',
      yellow: '#ffdc00'
    }
  }
): IAianaTheme {
  return Object.assign({}, base, theme) as IAianaTheme;
}

export default {
  contrasted,
  inria,
  inverted
};
