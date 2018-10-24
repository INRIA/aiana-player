import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { CDispatch } from 'src/store';
import { updateActiveTextTrack } from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import { IRawTextTrack, isDisplayableTrack } from '../../utils/media-tracks';

interface IProps {
  nativeControls: boolean;
  textTracks: IRawTextTrack[];
  mediaElement: HTMLMediaElement | null;
}

interface IDispatchProps {
  selectedTrackChangedHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface ISubtitlesTrackSelector
  extends IProps,
    IDispatchProps,
    InjectedTranslateProps {}

const SubtitlesTrackSelector: React.SFC<ISubtitlesTrackSelector> = ({
  mediaElement,
  selectedTrackChangedHandler,
  t,
  textTracks
}) => {
  if (!mediaElement) {
    return null;
  }

  const selectedTrack = textTracks.find((track) => track.active);
  const selectedValue = selectedTrack ? selectedTrack.label : '';

  return (
    <div className="aip-subtitles-track-selector">
      <label>
        <span>{t('preferences.subtitlestrack.label')}</span>
        <select onChange={selectedTrackChangedHandler} value={selectedValue}>
          <option value="">
            {t('preferences.subtitlestrack.no_subtitle')}
          </option>
          {textTracks.filter(isDisplayableTrack).map((track) => (
            <option key={track.label} value={track.label}>
              {track.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

const mapStateToProps = (state: IAianaState) => ({
  mediaElement: state.player.mediaElement,
  nativeControls: state.player.nativeControls,
  textTracks: state.player.textTracks
});

const mapDispatchToProps = (dispatch: CDispatch) => ({
  selectedTrackChangedHandler: (evt: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateActiveTextTrack(evt.currentTarget.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(SubtitlesTrackSelector));
