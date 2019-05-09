import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveSlidesTrack } from '../../actions/slides';
import withUniqueId, { InjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';
import { CDispatch } from '../../store';
import { IRawSlidesTrack } from '../../utils/media';

interface IStateProps {
  slidesTracks: IRawSlidesTrack[];
  currentLanguage: string;
  mediaElement?: HTMLMediaElement;
}

interface IDispatchProps {
  selectedTrackChangedHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface ISlidesTrackSelector
  extends InjectedUniqueIdProps,
    IStateProps,
    IDispatchProps {}

export function getSelectedValue(
  tracks: IRawSlidesTrack[],
  language: string
): string {
  const selectedTrack = tracks.find((track) => {
    return track.language === language;
  });

  return selectedTrack ? selectedTrack.language : '';
}

function SlidesTrackSelector({
  slidesTracks,
  currentLanguage,
  mediaElement,
  selectedTrackChangedHandler,
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
        value={getSelectedValue(slidesTracks, currentLanguage)}
      >
        {slidesTracks.map(({ language }) => (
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
    currentLanguage: state.slides.language,
    mediaElement: state.player.mediaElement,
    slidesTracks: state.slides.slidesTracks
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
