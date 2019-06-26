import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { changePlaybackRate } from '../../actions/player';
import withUniqueId, { IInjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';

interface IStateProps {
  currentPlaybackRate?: number;
  mediaSelector: string;
  playbackRates?: number[];
}

interface IDispatchProps {
  changePlaybackRate(mediaSelector: string, playbackRate: number): void;
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
          {playbackRates &&
            playbackRates.map((playbackRate) => (
              <option key={playbackRate} value={playbackRate}>
                ×{playbackRate}
              </option>
            ))}
        </select>
      </React.Fragment>
    );
  }

  onPlayRateChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const playbackRateValue = Number(evt.currentTarget.value);

    this.props.changePlaybackRate(this.props.mediaSelector, playbackRateValue);
  };
}

function mapState(state: IAianaState) {
  return {
    currentPlaybackRate: state.player.playbackRate,
    mediaSelector: state.player.mediaSelector,
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
