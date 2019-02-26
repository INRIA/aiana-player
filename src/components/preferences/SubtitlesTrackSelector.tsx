import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveSubtitlesTrack } from '../../actions/subtitles';
import withUniqueId, { InjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers/index';
import { CDispatch } from '../../store';
import {
  IRawSubtitlesTrack,
  isActiveTrack,
  isDisplayableTrack
} from '../../utils/media';

interface IStateProps {
  subtitlesTracks: IRawSubtitlesTrack[];
  mediaElement?: HTMLMediaElement;
}

interface IDispatchProps {
  selectedTrackChangedHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface ISubtitlesTrackSelector
  extends InjectedUniqueIdProps,
    IStateProps,
    IDispatchProps {}

export function getSelectedValue(tracks: IRawSubtitlesTrack[]): string {
  const selectedTrack = tracks.find(isActiveTrack);

  return selectedTrack ? selectedTrack.language : '';
}

function SubtitlesTrackSelector({
  mediaElement,
  selectedTrackChangedHandler,
  subtitlesTracks,
  uid
}: ISubtitlesTrackSelector) {
  if (!mediaElement) {
    return null;
  }

  const [t] = useTranslation();

  return (
    <React.Fragment>
      <span id={uid}>{t('preferences.subtitlestrack.label')}</span>
      <select
        aria-labelledby={uid}
        onChange={selectedTrackChangedHandler}
        value={getSelectedValue(subtitlesTracks)}
      >
        <option value="">{t('preferences.subtitlestrack.no_subtitle')}</option>
        {subtitlesTracks.filter(isDisplayableTrack).map(({ language }) => (
          <option key={language} value={language}>
            {t(`languages.${language}`)}
          </option>
        ))}
      </select>
    </React.Fragment>
  );
}

function mapStateToProps(state: IAianaState) {
  return {
    mediaElement: state.player.mediaElement,
    subtitlesTracks: state.subtitles.subtitlesTracks
  };
}

function mapDispatchToProps(dispatch: CDispatch) {
  return {
    selectedTrackChangedHandler: (
      evt: React.ChangeEvent<HTMLSelectElement>
    ) => {
      dispatch(updateActiveSubtitlesTrack(evt.currentTarget.value));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withUniqueId(SubtitlesTrackSelector));
