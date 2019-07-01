import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveChaptersTrack } from '../../actions/chapters';
import withUniqueId, { IInjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';
import { CDispatch } from '../../store';
import {
  IChaptersState,
  getSelectedChaptersLanguage
} from '../../reducers/chapters';

interface IStateProps {
  chapters: IChaptersState;
}

interface IDispatchProps {
  selectedTrackChangedHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface IChaptersTrackSelector
  extends IInjectedUniqueIdProps,
    IStateProps,
    IDispatchProps {}

function ChaptersTrackSelector({
  chapters,
  selectedTrackChangedHandler,
  uid
}: IChaptersTrackSelector) {
  const [t] = useTranslation();

  return (
    <Fragment>
      <span id={uid}>{t('preferences.chapterstrack.label')}</span>
      <select
        aria-labelledby={uid}
        onChange={selectedTrackChangedHandler}
        value={getSelectedChaptersLanguage(chapters)}
      >
        {chapters.chaptersTracks.map(({ language }) => (
          <option key={language} value={language}>
            {t(`languages.${language}`)}
          </option>
        ))}
      </select>
    </Fragment>
  );
}

function mapState(state: IAianaState) {
  return {
    chapters: state.chapters
  };
}

function mapDispatch(dispatch: CDispatch) {
  return {
    selectedTrackChangedHandler: (
      evt: React.ChangeEvent<HTMLSelectElement>
    ) => {
      dispatch(updateActiveChaptersTrack(evt.currentTarget.value));
    }
  };
}

export default connect(
  mapState,
  mapDispatch
)(withUniqueId(ChaptersTrackSelector));
