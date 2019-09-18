import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import {
  updateActiveSubtitles,
  setSubtitlesText
} from '../../actions/subtitles';
import { IAianaState } from '../../reducers';
import { CDispatch } from '../../store';
import {
  ISubtitlesState,
  getSelectedSubtitlesLanguage,
  getDisplayableSubtitlesTracks
} from '../../reducers/subtitles';
import useId from '../../hooks/useId';

interface IStateProps {
  subtitles: ISubtitlesState;
}

interface IDispatchProps {
  selectedTrackChangedHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface ISubtitlesTrackSelector extends IStateProps, IDispatchProps {}

function SubtitlesTrackSelector({
  selectedTrackChangedHandler,
  subtitles
}: ISubtitlesTrackSelector) {
  const [t] = useTranslation();
  const [id] = useId();

  return (
    <Fragment>
      <span id={id}>{t('preferences.subtitlestrack.label')}</span>
      <select
        aria-labelledby={id}
        onBlur={selectedTrackChangedHandler}
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
    </Fragment>
  );
}

function mapState(state: IAianaState) {
  return {
    subtitles: state.subtitles
  };
}

function mapDispatch(dispatch: CDispatch) {
  return {
    selectedTrackChangedHandler: (
      evt: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const subtitlesTrackLanguage = evt.currentTarget.value;

      dispatch(updateActiveSubtitles(subtitlesTrackLanguage));

      if (subtitlesTrackLanguage === '') {
        dispatch(setSubtitlesText());
      }
    }
  };
}

export default connect(
  mapState,
  mapDispatch
)(SubtitlesTrackSelector);
