import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveSlidesTrack } from '../../actions/slides';
import { IAianaState } from '../../reducers';
import { CDispatch } from '../../store';
import { ISlidesState, getSelectedTrackLanguage } from '../../reducers/slides';
import useId from '../../hooks/useId';

interface IStateProps {
  slides: ISlidesState;
}

interface IDispatchProps {
  selectedTrackChangedHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface ISlidesTrackSelector extends IStateProps, IDispatchProps {}

function SlidesTrackSelector({
  selectedTrackChangedHandler,
  slides
}: ISlidesTrackSelector) {
  const [t] = useTranslation();
  const [id] = useId();

  return (
    <Fragment>
      <span id={id}>{t('preferences.slidestrack.label')}</span>
      <select
        aria-labelledby={id}
        onBlur={selectedTrackChangedHandler}
        onChange={selectedTrackChangedHandler}
        value={getSelectedTrackLanguage(slides)}
      >
        {slides.slidesTracks.map(({ language }) => (
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
    slides: state.slides
  };
}

function mapDispatch(dispatch: CDispatch) {
  return {
    selectedTrackChangedHandler: (
      evt: React.ChangeEvent<HTMLSelectElement>
    ) => {
      dispatch(updateActiveSlidesTrack(evt.currentTarget.value));
    }
  };
}

export default connect(
  mapState,
  mapDispatch
)(SlidesTrackSelector);
