import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveChaptersTrack } from '../../actions/chapters';
import { IAianaState } from '../../reducers';
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
  updateActiveChaptersTrack(lang: string): void;
}

interface IChaptersTrackSelector extends IStateProps, IDispatchProps {}

function ChaptersTrackSelector(props: IChaptersTrackSelector) {
  const [t] = useTranslation();
  const [id] = useId();

  const currentValue = getSelectedChaptersLanguage(props.chapters);

  const changeHandler = (evt: React.SyntheticEvent<HTMLSelectElement>) => {
    if (evt.currentTarget.value !== currentValue) {
      props.updateActiveChaptersTrack(evt.currentTarget.value);
    }
  };

  return (
    <Fragment>
      <span id={id}>{t('preferences.chapterstrack.label')}</span>
      <select
        aria-labelledby={id}
        onBlur={changeHandler}
        onChange={changeHandler}
        value={currentValue}
      >
        {props.chapters.chaptersTracks.map((track) => (
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

const mapDispatch = {
  updateActiveChaptersTrack
};

export default connect(
  mapState,
  mapDispatch
)(ChaptersTrackSelector);
