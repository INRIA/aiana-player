import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import {
  updateActiveSubtitles,
  setSubtitlesText
} from '../../actions/subtitles';
import { IAianaState } from '../../reducers';
import {
  ISubtitlesState,
  getSelectedSubtitlesLanguage,
  getDisplayableSubtitlesTracks
} from '../../reducers/subtitles';
import useId from '../../hooks/useId';
import { getTrackKey } from '../../utils/media';

interface IStateProps {
  subtitles: ISubtitlesState;
}

interface IDispatchProps {
  updateActiveSubtitles(lang: string): void;
  setSubtitlesText(text?: string): void;
}

interface ISubtitlesTrackSelector extends IStateProps, IDispatchProps {}

function SubtitlesTrackSelector(props: ISubtitlesTrackSelector) {
  const [t] = useTranslation();
  const [id] = useId();

  const currentLang = getSelectedSubtitlesLanguage(props.subtitles);

  const changeHandler = (evt: React.SyntheticEvent<HTMLSelectElement>) => {
    const subtitlesTrackLanguage = evt.currentTarget.value;

    if (subtitlesTrackLanguage !== currentLang) {
      props.updateActiveSubtitles(subtitlesTrackLanguage);

      if (subtitlesTrackLanguage === '') {
        props.setSubtitlesText();
      }
    }
  };

  return (
    <Fragment>
      <span id={id}>{t('preferences.subtitlestrack.label')}</span>
      <select
        aria-labelledby={id}
        onBlur={changeHandler}
        onChange={changeHandler}
        value={currentLang}
      >
        <option value="">{t('preferences.subtitlestrack.no_subtitle')}</option>
        {getDisplayableSubtitlesTracks(props.subtitles).map((track) => (
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
    subtitles: state.subtitles
  };
}

const mapDispatch = {
  setSubtitlesText,
  updateActiveSubtitles
};

export default connect(
  mapState,
  mapDispatch
)(SubtitlesTrackSelector);
