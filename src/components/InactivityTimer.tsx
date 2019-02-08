import React from 'react';
import { connect } from 'react-redux';
import { toggleActivity } from '../actions/preferences';
import { INACTIVITY_EVENTS, INACTIVITY_TIMER_DURATION } from '../constants';
import { IAianaState } from '../reducers';
import { ExtendedHTMLElement } from '../types';

interface IStateProps {
  isPlaying: boolean;
  isSeeking: boolean;
  playerElement?: ExtendedHTMLElement;
}

interface IDispatchProps {
  toggleActivity(isActive: boolean): any;
}

interface IInactivityTimer extends IStateProps, IDispatchProps {}

class InactivityTimer extends React.Component<IInactivityTimer> {
  private inactivityTimer?: number;

  render() {
    return null;
  }

  componentDidUpdate(prevProps: IInactivityTimer) {
    if (!prevProps.playerElement && this.props.playerElement) {
      this.attachEventsListeners();
    } else if (prevProps.playerElement && !this.props.playerElement) {
      this.detachEventsListeners();
    }

    if (
      this.props.playerElement &&
      !prevProps.isPlaying &&
      this.props.isPlaying
    ) {
      this.startTimer();
    } else if (
      this.props.playerElement &&
      prevProps.isPlaying &&
      !this.props.isPlaying
    ) {
      this.stopTimer();
      this.props.toggleActivity(true);
    }
  }

  private startTimer() {
    this.inactivityTimer = window.setTimeout(
      this.triggerInactivity,
      INACTIVITY_TIMER_DURATION
    );
  }

  private stopTimer() {
    window.clearTimeout(this.inactivityTimer);
  }

  private attachEventsListeners() {
    if (!this.props.playerElement) {
      return;
    }

    this.props.playerElement.addEventListener(
      'mouseleave',
      this.triggerInactivity,
      true
    );

    for (const evt of INACTIVITY_EVENTS) {
      this.props.playerElement.addEventListener(
        evt,
        this.resetInactivityTimer,
        true
      );
    }
  }

  private detachEventsListeners() {
    if (!this.props.playerElement) {
      return;
    }

    this.props.playerElement.removeEventListener(
      'mouseleave',
      this.triggerInactivity,
      true
    );

    for (const evt of INACTIVITY_EVENTS) {
      this.props.playerElement.removeEventListener(
        evt,
        this.resetInactivityTimer,
        true
      );
    }
  }

  private triggerInactivity = () => {
    if (this.props.isPlaying) {
      this.props.toggleActivity(false);
    }
  };

  private resetInactivityTimer = () => {
    if (this.props.isPlaying) {
      this.stopTimer();
      this.startTimer();
      this.props.toggleActivity(true);
    }
  };
}

function mapStateToProps(state: IAianaState) {
  return {
    isPlaying: state.player.isPlaying,
    isSeeking: state.player.isSeeking,
    playerElement: state.player.playerElement
  };
}

const mapDispatchToProps = {
  toggleActivity
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InactivityTimer);
