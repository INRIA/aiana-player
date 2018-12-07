import * as React from 'react';
import { I18nContextValues, withI18n } from 'react-i18next';
import { connect } from 'react-redux';
import { changePlaybackRate } from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import withUniqueId, { InjectedUniqueIdProps } from '../hocs/withUniqueId';

interface IStateProps {
  currentPlaybackRate: number;
  mediaElement?: HTMLMediaElement;
  playbackRates: number[];
}

interface IDispatchProps {
  changePlaybackRate(media: HTMLMediaElement, playbackRate: number): void;
}

interface IPlaybackRateSelector
  extends InjectedUniqueIdProps,
    IStateProps,
    IDispatchProps,
    I18nContextValues {}

class PlaybackRateSelector extends React.Component<IPlaybackRateSelector> {
  public render() {
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

const mapStateToProps = (state: IAianaState) => ({
  currentPlaybackRate: state.player.playbackRate,
  mediaElement: state.player.mediaElement,
  playbackRates: state.preferences.playbackRates
});

const mapDispatchToProps = {
  changePlaybackRate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withI18n()(withUniqueId(PlaybackRateSelector)));
