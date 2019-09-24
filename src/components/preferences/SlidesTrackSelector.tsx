import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveSlidesTrack } from '../../actions/slides';
import { IAianaState } from '../../reducers';
import { ISlidesState, getSelectedTrackLanguage } from '../../reducers/slides';
import useId from '../../hooks/useId';
import { getTrackKey } from '../../utils/media';

interface IStateProps {
  slides: ISlidesState;
}

interface IDispatchProps {
  updateActiveSlidesTrack(lang: string): void;
}

interface ISlidesTrackSelector extends IStateProps, IDispatchProps {}

function SlidesTrackSelector(props: ISlidesTrackSelector) {
  const [t] = useTranslation();
  const [id] = useId();

  const currentValue = getSelectedTrackLanguage(props.slides);

  const changeHandler = (evt: React.SyntheticEvent<HTMLSelectElement>) => {
    if (evt.currentTarget.value !== currentValue) {
      props.updateActiveSlidesTrack(evt.currentTarget.value);
    }
  };

  return (
    <Fragment>
      <span id={id}>{t('preferences.slidestrack.label')}</span>
      <select
        aria-labelledby={id}
        onBlur={changeHandler}
        onChange={changeHandler}
        value={currentValue}
      >
        {props.slides.slidesTracks.map((track) => (
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
    slides: state.slides
  };
}

const mapDispatch = {
  updateActiveSlidesTrack
};

export default connect(
  mapState,
  mapDispatch
)(SlidesTrackSelector);
