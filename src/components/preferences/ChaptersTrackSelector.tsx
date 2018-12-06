import * as React from 'react';
import { I18nContextValues, withI18n } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveChaptersTrack } from '../../actions/chapters';
import { IAianaState } from '../../reducers';
import { CDispatch } from '../../store';
import { IRawChaptersTrack } from '../../utils/media';
import { uuid } from '../../utils/ui';

interface IStateProps {
  chaptersTracks: IRawChaptersTrack[];
  currentLanguage: string;
  mediaElement?: HTMLMediaElement;
}

interface IDispatchProps {
  selectedTrackChangedHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface IChaptersTrackSelector
  extends IStateProps,
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

const ChaptersTrackSelector: React.SFC<IChaptersTrackSelector> = ({
  chaptersTracks,
  currentLanguage,
  mediaElement,
  selectedTrackChangedHandler,
  t
}) => {
  if (!mediaElement) {
    return null;
  }

  const id = uuid();

  return (
    <React.Fragment>
      <span id={id}>{t('preferences.chapterstrack.label')}</span>
      <select
        aria-labelledby={id}
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
};

const mapStateToProps = (state: IAianaState) => ({
  chaptersTracks: state.chapters.chaptersTracks,
  currentLanguage: state.chapters.language,
  mediaElement: state.player.mediaElement
});

const mapDispatchToProps = (dispatch: CDispatch) => ({
  selectedTrackChangedHandler: (evt: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateActiveChaptersTrack(evt.currentTarget.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withI18n()(ChaptersTrackSelector));
