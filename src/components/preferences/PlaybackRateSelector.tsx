import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { changePlaybackRate } from 'src/actions/player';
import { IAianaState } from 'src/reducers/index';

interface IProps {
  availablePlaybackRates: number[];
  currentPlaybackRate: number;
  mediaElement: HTMLMediaElement | null;
}

interface IDispatchProps {
  changePlaybackRate(media: HTMLMediaElement, playbackRate: number): void;
}

interface IPlaybackRateSelector
  extends IProps,
    IDispatchProps,
    InjectedTranslateProps {}

class PlaybackRateSelector extends React.Component<IPlaybackRateSelector> {
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
  availablePlaybackRates: state.preferences.availablePlaybackRates,
  currentPlaybackRate: state.player.playbackRate,
  mediaElement: state.player.mediaElement
});

const mapDispatchToProps = {
  changePlaybackRate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(PlaybackRateSelector));
