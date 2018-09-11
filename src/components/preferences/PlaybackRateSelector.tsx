import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { changePlaybackRate } from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store/index';

interface IProps {
  availablePlaybackRates: string[];
  currentPlaybackRate: string;
  videoElement: HTMLVideoElement;
}

class PlayRateSelector extends React.Component<IProps & IConnectedReduxProps> {
  private playbackRateSelect = React.createRef<HTMLSelectElement>();

  public render() {
    const { availablePlaybackRates, currentPlaybackRate } = this.props;

    return (
      <div className="aip-playback-rate-selector">
        <label>
          <FormattedMessage id="preferences.playbackrate.label" />
          <select
            ref={this.playbackRateSelect}
            onChange={this.onPlayRateChange}
            value={currentPlaybackRate}
          >
            {availablePlaybackRates.map((playbackRate) => (
              <option key={playbackRate} value={playbackRate}>
                {playbackRate.toString()}
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
  videoElement: state.player.videoElement
}))(PlayRateSelector);
