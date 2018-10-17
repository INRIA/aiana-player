import * as React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveTextTrack } from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import { IRawTextTrack } from '../../utils/media-tracks';
import { ITransnected } from '../../utils/types';

interface ISubtitlesTrackSelector extends ITransnected {
  nativeControls: boolean;
  textTracks: IRawTextTrack[];
  mediaElement: HTMLMediaElement | null;
}

class SubtitlesTrackSelector extends React.Component<ISubtitlesTrackSelector> {
  public render() {
    const { mediaElement, t, textTracks } = this.props;

    if (!mediaElement) {
      return null;
    }

    const selectedTrack = textTracks.find((track) => track.active);
    const selectedValue = selectedTrack ? selectedTrack.label : '';

    return (
      <div className="aip-subtitles-track-selector">
        <label>
          <span>{t('preferences.subtitlestrack.label')}</span>
          <select
            onChange={this.selectedTrackChangedHandler}
            value={selectedValue}
          >
            <option value="">
              {t('preferences.subtitlestrack.no_subtitle')}
            </option>
            {textTracks
              .filter((track) => {
                return track.kind === 'subtitles' || track.kind === 'captions';
              })
              .map((track) => (
                <option key={track.label} value={track.label}>
                  {track.label}
                </option>
              ))}
          </select>
        </label>
      </div>
    );
  }

  private selectedTrackChangedHandler = (
    evt: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { dispatch } = this.props;
    const trackLabel = evt.currentTarget.value;
    dispatch(updateActiveTextTrack(trackLabel));
  };
}

export default connect((state: IAianaState) => ({
  mediaElement: state.player.mediaElement,
  nativeControls: state.player.nativeControls,
  textTracks: state.player.textTracks
}))(translate()(SubtitlesTrackSelector));
