import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveChaptersTrack } from '../../actions/chapters';
import { IAianaState } from '../../reducers';
import { CDispatch } from '../../store';
import {
  IChaptersState,
  getSelectedChaptersLanguage
} from '../../reducers/chapters';
import useId from '../../hooks/useId';
import { getTrackKey } from '../../utils/media';

interface IStateProps {
  chapters: IChaptersState;
}

interface IDispatchProps {
  selectedTrackChangedHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface IChaptersTrackSelector extends IStateProps, IDispatchProps {}

function ChaptersTrackSelector({
  chapters,
  selectedTrackChangedHandler
}: IChaptersTrackSelector) {
  const [t] = useTranslation();
  const [id] = useId();

  return (
    <Fragment>
      <span id={id}>{t('preferences.chapterstrack.label')}</span>
      <select
        aria-labelledby={id}
        onBlur={selectedTrackChangedHandler}
        onChange={selectedTrackChangedHandler}
        value={getSelectedChaptersLanguage(chapters)}
      >
        {chapters.chaptersTracks.map((track) => (
          <option key={getTrackKey(track)} value={track.language}>
            {t(`languages.${track.language}`)}
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
)(ChaptersTrackSelector);
