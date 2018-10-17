import * as React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { changePlaybackRate } from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import { ITransnected } from '../../utils/types';

interface IProps extends ITransnected {
  availablePlaybackRates: number[];
  currentPlaybackRate: number;
  mediaElement: HTMLMediaElement | null;
}

class PlaybackRateSelector extends React.Component<IProps> {
  public render() {
    const { availablePlaybackRates, currentPlaybackRate, t } = this.props;

    return (
      <div className="aip-playback-rate-selector">
        <label>
          <span>{t('preferences.playbackrate.label')}</span>
          <select value={currentPlaybackRate} onChange={this.onPlayRateChange}>
            {availablePlaybackRates.map((playbackRate) => (
              <option key={playbackRate} value={playbackRate}>
                {playbackRate}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }

  private onPlayRateChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const { dispatch, mediaElement } = this.props;

    if (!mediaElement) {
      return;
    }

    const playbackRateValue = Number(evt.currentTarget.value);

    dispatch(changePlaybackRate(mediaElement, playbackRateValue));
  };
}

export default connect((state: IAianaState) => ({
  availablePlaybackRates: state.preferences.availablePlaybackRates,
  currentPlaybackRate: state.player.playbackRate,
  mediaElement: state.player.mediaElement
}))(translate()(PlaybackRateSelector));
