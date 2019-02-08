import React from 'react';
import { I18nContextValues, withI18n } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveChaptersTrack } from '../../actions/chapters';
import { IAianaState } from '../../reducers';
import { CDispatch } from '../../store';
import { IRawChaptersTrack } from '../../utils/media';
import withUniqueId, { InjectedUniqueIdProps } from '../hocs/withUniqueId';

interface IStateProps {
  chaptersTracks: IRawChaptersTrack[];
  currentLanguage: string;
  mediaElement?: HTMLMediaElement;
}

interface IDispatchProps {
  selectedTrackChangedHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface IChaptersTrackSelector
  extends InjectedUniqueIdProps,
    IStateProps,
    IDispatchProps,
    I18nContextValues {}

function getSelectedValue(
  tracks: IRawChaptersTrack[],
  language: string
): string {
  const selectedTrack = tracks.find((track) => {
    return track.language === language;
  });

  return selectedTrack ? selectedTrack.language : '';
}

function ChaptersTrackSelector({
  chaptersTracks,
  currentLanguage,
  mediaElement,
  selectedTrackChangedHandler,
  t,
  uid
}: IChaptersTrackSelector) {
  if (!mediaElement) {
    return null;
  }

  return (
    <React.Fragment>
      <span id={uid}>{t('preferences.chapterstrack.label')}</span>
      <select
        aria-labelledby={uid}
        onChange={selectedTrackChangedHandler}
        value={getSelectedValue(chaptersTracks, currentLanguage)}
      >
        {chaptersTracks.map(({ language }) => (
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
    chaptersTracks: state.chapters.chaptersTracks,
    currentLanguage: state.chapters.language,
    mediaElement: state.player.mediaElement
  };
}

function mapDispatchToProps(dispatch: CDispatch) {
  return {
    selectedTrackChangedHandler: (
      evt: React.ChangeEvent<HTMLSelectElement>
    ) => {
      dispatch(updateActiveChaptersTrack(evt.currentTarget.value));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withI18n()(withUniqueId(ChaptersTrackSelector)));
