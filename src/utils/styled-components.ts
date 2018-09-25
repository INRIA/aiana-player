import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';

export interface IAianaTheme {
  fg: string;
  bg: string;
  main: string;
}

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<IAianaTheme>;

export { css, injectGlobal, keyframes, ThemeProvider };
export default styled;
