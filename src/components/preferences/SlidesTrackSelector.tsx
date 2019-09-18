import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveSlidesTrack } from '../../actions/slides';
import withUniqueId, { IInjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';
import { CDispatch } from '../../store';
import { ISlidesState, getSelectedTrackLanguage } from '../../reducers/slides';

interface IStateProps {
  slides: ISlidesState;
}

interface IDispatchProps {
  selectedTrackChangedHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface ISlidesTrackSelector
  extends IInjectedUniqueIdProps,
    IStateProps,
    IDispatchProps {}

function SlidesTrackSelector({
  selectedTrackChangedHandler,
  slides,
  uid
}: ISlidesTrackSelector) {
  const [t] = useTranslation();

  return (
    <Fragment>
      <span id={uid}>{t('preferences.slidestrack.label')}</span>
      <select
        aria-labelledby={uid}
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
)(withUniqueId(SlidesTrackSelector));
