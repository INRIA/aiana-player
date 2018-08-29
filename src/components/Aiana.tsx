import * as React from 'react';
import IntlWrapper from './IntlWrapper';
import styled, { ThemeProvider } from '../utils/styled-components';
import { injectGlobalStyles } from '../utils/global-styles';
import Player from './Player';

const StyledDiv = styled.div`
  display: block;
  box-sizing: border-box;
  background-color: #000;
  color: #fff;
  font-size: 1rem;
  line-height: 1;
  font-family: system, sans-serif;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

const theme = {
  primaryColor: '#fff',
  primaryColorInverted: '#000'
};

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
        <ThemeProvider theme={theme}>
          <StyledDiv>
            <Player mediaSources={debugSources} />
          </StyledDiv>
        </ThemeProvider>
      </IntlWrapper>
    );
  }
}

export default Aiana;
