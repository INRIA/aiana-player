import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveSlidesTrack } from '../../actions/slides';
import withUniqueId, { IInjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';
import { CDispatch } from '../../store';
import { ISlidesState, getSelectedTrackLanguage } from '../../reducers/slides';

interface IStateProps {
  mediaElement?: HTMLMediaElement;
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
  mediaElement,
  selectedTrackChangedHandler,
  slides,
  uid
}: ISlidesTrackSelector) {
  const [t] = useTranslation();

  if (!mediaElement) {
    return null;
  }

  return (
    <React.Fragment>
      <span id={uid}>{t('preferences.slidestrack.label')}</span>
      <select
        aria-labelledby={uid}
        onChange={selectedTrackChangedHandler}
        value={getSelectedTrackLanguage(slides)}
      >
        {slides.slidesTracks.map(({ language }) => (
          <option key={language} value={language}>
            {t(`languages.${language}`)}
          </option>
        ))}
      </select>
    </React.Fragment>
  );
}

function mapState(state: IAianaState) {
  return {
    mediaElement: state.player.mediaElement,
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
