import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveTextTrack } from 'src/actions/player';
import { IAianaState } from 'src/reducers/index';
import { CDispatch } from 'src/store';
import { IRawTextTrack, isDisplayableTrack } from 'src/utils/media';
import { uuid } from 'src/utils/ui';

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
  const id = uuid();

  return (
    <React.Fragment>
      <span id={id}>{t('preferences.subtitlestrack.label')}</span>
      <select
        aria-labelledby={id}
        onChange={selectedTrackChangedHandler}
        value={selectedValue}
      >
        <option value="">{t('preferences.subtitlestrack.no_subtitle')}</option>
        {textTracks.filter(isDisplayableTrack).map((track) => (
          <option key={track.label} value={track.label}>
            {track.label}
          </option>
        ))}
      </select>
    </React.Fragment>
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
