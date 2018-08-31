import 'focus-visible';
import * as React from 'react';
import themes from '../themes';
import { injectGlobalStyles } from '../utils/global-styles';
import { ThemeProvider } from '../utils/styled-components';
import IntlWrapper from './IntlWrapper';
import Player from './Player';
import StyledAiana from './styled/StyledAiana';

const { inria } = themes;

const debugSources = [
  {
    src: 'https://d381hmu4snvm3e.cloudfront.net/videos/w0z9Ik6mMj83/SD.mp4',
    type: 'video/mp4'
  }
];

class Aiana extends React.Component {
  constructor(props: any) {
    super(props);

    injectGlobalStyles();
  }

  public render() {
    return (
      <IntlWrapper>
        <ThemeProvider theme={inria}>
          <StyledAiana>
            <Player mediaSources={debugSources} />
          </StyledAiana>
        </ThemeProvider>
      </IntlWrapper>
    );
  }
}

export default Aiana;
