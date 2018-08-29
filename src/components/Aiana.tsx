import 'focus-visible';
import * as React from 'react';
import themes from '../themes';
import { injectGlobalStyles } from '../utils/global-styles';
import styled, { ThemeProvider } from '../utils/styled-components';
import IntlWrapper from './IntlWrapper';
import Player from './Player';

const StyledDiv = styled.div`
  display: block;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.fg};
  font-size: 1rem;
  line-height: 1;
  font-family: system, sans-serif;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

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
          <StyledDiv>
            <Player mediaSources={debugSources} />
          </StyledDiv>
        </ThemeProvider>
      </IntlWrapper>
    );
  }
}

export default Aiana;
