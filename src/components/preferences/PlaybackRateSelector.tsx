import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { changePlaybackRate } from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store/index';

interface IProps {
  availablePlaybackRates: number[];
  currentPlaybackRate: number;
  videoElement: HTMLVideoElement;
}

class PlaybackRateSelector extends React.Component<
  IProps & InjectedTranslateProps & IConnectedReduxProps
> {
  private playbackRateSelect = React.createRef<HTMLSelectElement>();

  public render() {
    const { availablePlaybackRates, currentPlaybackRate, t } = this.props;

    return (
      <div className="aip-playback-rate-selector">
        <label>
          <span>{t('preferences.playbackrate.label')}</span>
          <select
            ref={this.playbackRateSelect}
            value={currentPlaybackRate}
            onChange={this.onPlayRateChange}
          >
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

  private onPlayRateChange = () => {
    const { dispatch, videoElement } = this.props;
    const playbackRateValue = Number(this.playbackRateSelect.current!.value);

    dispatch(changePlaybackRate(videoElement, playbackRateValue));
  };
}

export default connect((state: IAianaState) => ({
  availablePlaybackRates: state.preferences.availablePlaybackRates,
  currentPlaybackRate: state.player.playbackRate,
  videoElement: state.player.videoElement!
}))(translate()(PlaybackRateSelector));
