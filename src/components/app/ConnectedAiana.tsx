import classNames from 'classnames';
import 'focus-visible';
import * as React from 'react';
import { connect } from 'react-redux';
import {
  handleFullscreenChange,
  playerElementMounted
} from '../../actions/player';
import { toggleActivity } from '../../actions/preferences';
import { handleFetchInitialData } from '../../actions/shared';
import SvgFilters from '../../components/shared/filters';
import { INACTIVITY_EVENTS, INACTIVITY_TIMER_DURATION } from '../../constants';
import { IAianaState } from '../../reducers/index';
import themes from '../../themes';
import {
  addFullscreenChangeEventListener,
  isDocumentFullscreen,
  removeFullscreenChangeEventListener
} from '../../utils/fullscreen';
import { injectGlobalStyles } from '../../utils/global-styles';
import { ThemeProvider } from '../../utils/styled-components';
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
  toggleActivity(isActive: boolean): any;
}

interface IAiana extends IStateProps, IDispatchProps {}

class Aiana extends React.Component<IAiana> {
  private fullscreenRef = React.createRef<HTMLElement>();
  private inactivityTimer?: number;

  constructor(props: any) {
    super(props);
    injectGlobalStyles();
  }

  public render() {
    const currentTheme = themes[this.props.currentTheme];

    const elementClasses = classNames({
      'aip-app': true,
      inactive: !this.props.isActive
    });

    return (
      <IntlWrapper>
        <ThemeProvider theme={currentTheme}>
          <StyledAiana className={elementClasses} innerRef={this.fullscreenRef}>
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

    INACTIVITY_EVENTS.forEach((evt) => {
      this.fullscreenRef.current!.addEventListener(
        evt,
        this.resetInactivityTimer,
        true
      );
    });

    this.inactivityTimer = window.setTimeout(
      this.triggerInactivity,
      INACTIVITY_TIMER_DURATION
    );
  }

  public componentWillUnmount() {
    removeFullscreenChangeEventListener(this.fullscreenHandler);

    INACTIVITY_EVENTS.forEach((evt) => {
      this.fullscreenRef.current!.removeEventListener(
        evt,
        this.resetInactivityTimer,
        true
      );
    });
  }

  private triggerInactivity = () => {
    this.props.toggleActivity(false);
  };

  private resetInactivityTimer = () => {
    window.clearTimeout(this.inactivityTimer);

    this.inactivityTimer = window.setTimeout(
      this.triggerInactivity,
      INACTIVITY_TIMER_DURATION
    );

    this.props.toggleActivity(true);
  };

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
  playerElementMounted,
  toggleActivity
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Aiana);
