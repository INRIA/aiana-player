import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveSubtitlesTrack } from '../../actions/subtitles';
import withUniqueId, { IInjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';
import { CDispatch } from '../../store';
import {
  ISubtitlesState,
  getSelectedSubtitlesLanguage,
  getDisplayableSubtitlesTracks
} from '../../reducers/subtitles';

interface IStateProps {
  mediaElement?: HTMLMediaElement;
  subtitles: ISubtitlesState;
}

interface IDispatchProps {
  selectedTrackChangedHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface ISubtitlesTrackSelector
  extends IInjectedUniqueIdProps,
    IStateProps,
    IDispatchProps {}

function SubtitlesTrackSelector({
  mediaElement,
  selectedTrackChangedHandler,
  subtitles,
  uid
}: ISubtitlesTrackSelector) {
  const [t] = useTranslation();

  if (!mediaElement) {
    return null;
  }

  return (
    <React.Fragment>
      <span id={uid}>{t('preferences.subtitlestrack.label')}</span>
      <select
        aria-labelledby={uid}
        onChange={selectedTrackChangedHandler}
        value={getSelectedSubtitlesLanguage(subtitles)}
      >
        <option value="">{t('preferences.subtitlestrack.no_subtitle')}</option>
        {getDisplayableSubtitlesTracks(subtitles).map(({ language }) => (
          <option key={language} value={language}>
            {t(`languages.${language}`)}
          </option>
        ))}
      </select>
    </React.Fragment>
  );
}

function mapState(state: IAianaState) {
  return {
    mediaElement: state.player.mediaElement,
    subtitles: state.subtitles
  };
}

function mapDispatch(dispatch: CDispatch) {
  return {
    selectedTrackChangedHandler: (
      evt: React.ChangeEvent<HTMLSelectElement>
    ) => {
      dispatch(updateActiveSubtitlesTrack(evt.currentTarget.value));
    }
  };
}

export default connect(
  mapState,
  mapDispatch
)(withUniqueId(SubtitlesTrackSelector));
