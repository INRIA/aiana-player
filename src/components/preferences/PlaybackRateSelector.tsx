import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { changePlaybackRate } from '../../actions/player';
import withUniqueId, { IInjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';

interface IStateProps {
  currentPlaybackRate: number;
  mediaElement?: HTMLMediaElement;
  playbackRates: number[];
}

interface IDispatchProps {
  changePlaybackRate(media: HTMLMediaElement, playbackRate: number): void;
}

interface IPlaybackRateSelector
  extends IInjectedUniqueIdProps,
    IStateProps,
    IDispatchProps,
    WithTranslation {}

class PlaybackRateSelector extends React.Component<IPlaybackRateSelector> {
  render() {
    const { playbackRates, currentPlaybackRate, t, uid } = this.props;

    return (
      <React.Fragment>
        <span id={uid}>{t('preferences.playbackrate.label')}</span>
        <select
          aria-labelledby={uid}
          onChange={this.onPlayRateChange}
          value={currentPlaybackRate}
        >
          {playbackRates.map((playbackRate) => (
            <option key={playbackRate} value={playbackRate}>
              ×{playbackRate}
            </option>
          ))}
        </select>
      </React.Fragment>
    );
  }

  private onPlayRateChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      changePlaybackRate: changePlaybackRateAction,
      mediaElement
    } = this.props;

    if (!mediaElement) {
      return;
    }

    const playbackRateValue = Number(evt.currentTarget.value);

    changePlaybackRateAction(mediaElement, playbackRateValue);
  };
}

function mapState(state: IAianaState) {
  return {
    currentPlaybackRate: state.player.playbackRate,
    mediaElement: state.player.mediaElement,
    playbackRates: state.preferences.playbackRates
  };
}

const mapDispatch = {
  changePlaybackRate
};

export default connect(
  mapState,
  mapDispatch
)(withTranslation()(withUniqueId(PlaybackRateSelector)));
