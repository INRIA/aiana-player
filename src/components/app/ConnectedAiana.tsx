import classNames from 'classnames';
import 'focus-visible';
import * as React from 'react';
import { connect } from 'react-redux';
import {
  handleFullscreenChange,
  playerElementMounted
} from '../../actions/player';
import { handleFetchInitialData } from '../../actions/shared';
import SvgFilters from '../../components/shared/filters';
import { IAianaState } from '../../reducers/index';
import themes from '../../themes';
import {
  addFullscreenChangeEventListener,
  isDocumentFullscreen,
  removeFullscreenChangeEventListener
} from '../../utils/fullscreen';
import { ThemeProvider } from '../../utils/styled-components';
import InactivityTimer from '../InactivityTimer';
import Player from '../Player';
import PreferencesPanel from '../preferences/PreferencesPanel';
import StyledAiana from '../styled/StyledAiana';
import IntlWrapper from './IntlWrapper';

interface IStateProps {
  availableThemes: string[];
  currentTheme: string;
  isActive: boolean;
}

interface IDispatchProps {
  handleFetchInitialData(): void;
  handleFullscreenChange(isFullscreen: boolean): void;
  playerElementMounted(playerElement: HTMLElement): void;
}

interface IAiana extends IStateProps, IDispatchProps {}

class Aiana extends React.Component<IAiana> {
  private fullscreenRef = React.createRef<HTMLElement>();

  public render() {
    return (
      <IntlWrapper>
        <ThemeProvider theme={themes[this.props.currentTheme]}>
          <StyledAiana
            className={classNames({
              'aip-app': true,
              inactive: !this.props.isActive
            })}
            innerRef={this.fullscreenRef}
          >
            <InactivityTimer />
            <SvgFilters />
            <Player />
            <PreferencesPanel />
          </StyledAiana>
        </ThemeProvider>
      </IntlWrapper>
    );
  }

  public componentDidMount() {
    this.props.handleFetchInitialData();
    this.props.playerElementMounted(this.fullscreenRef.current!);
    addFullscreenChangeEventListener(this.fullscreenHandler);
  }

  public componentWillUnmount() {
    removeFullscreenChangeEventListener(this.fullscreenHandler);
  }

  private fullscreenHandler = () => {
    this.props.handleFullscreenChange(isDocumentFullscreen());
  };
}

function mapStateToProps(state: IAianaState) {
  return {
    availableThemes: state.preferences.themes,
    currentTheme: state.preferences.currentTheme,
    isActive: state.preferences.isActive
  };
}

const mapDispatchToProps = {
  handleFetchInitialData,
  handleFullscreenChange,
  playerElementMounted
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Aiana);
