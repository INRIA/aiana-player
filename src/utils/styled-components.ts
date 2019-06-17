import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';

export interface IAianaTheme {
  actionBg?: string;
  actionFg?: string;
  bg: string;
  clearFg: string;
  fg: string;
  focus: string;
  highlight: string;
  main: string;
}

const {
  default: styled,
  css,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<IAianaTheme>;

export { css, keyframes, ThemeProvider };
export default styled;
