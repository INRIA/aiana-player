import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveChaptersTrack } from '../../actions/chapters';
import withUniqueId, { InjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';
import { CDispatch } from '../../store';
import { IRawChaptersTrack } from '../../utils/media';

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
    IDispatchProps {}

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
  uid
}: IChaptersTrackSelector) {
  if (!mediaElement) {
    return null;
  }

  const [t] = useTranslation();

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
)(withUniqueId(ChaptersTrackSelector));
