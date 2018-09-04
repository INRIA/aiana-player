import 'focus-visible';
import * as React from 'react';
import { connect } from 'react-redux';
import { playerElementMounted } from '../actions/player';
import { IConnectedReduxProps } from '../store/index';
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

class Aiana extends React.Component<IConnectedReduxProps> {
  private fullscreenRef = React.createRef<HTMLElement>();

  constructor(props: any) {
    super(props);

    injectGlobalStyles();
  }

  public componentDidMount() {
    const { dispatch } = this.props;

    if (this.fullscreenRef.current) {
      dispatch(playerElementMounted(this.fullscreenRef.current));
    }
  }

  public render() {
    return (
      <IntlWrapper>
        <ThemeProvider theme={inria}>
          <StyledAiana innerRef={this.fullscreenRef}>
            <Player mediaSources={debugSources} />
          </StyledAiana>
        </ThemeProvider>
      </IntlWrapper>
    );
  }
}

export default connect()(Aiana);
