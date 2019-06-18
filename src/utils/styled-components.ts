import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';
import { IAianaTheme } from '../themes';

const {
  default: styled,
  css,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<IAianaTheme>;

export { css, keyframes, ThemeProvider };
export default styled;
