import * as React from 'react';
import { I18nContextValues, withI18n } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveSlidesTrack } from '../../actions/slides';
import { IAianaState } from '../../reducers';
import { CDispatch } from '../../store';
import { IRawSlidesTrack } from '../../utils/media';
import withUniqueId, { InjectedUniqueIdProps } from '../hocs/withUniqueId';

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
    IDispatchProps,
    I18nContextValues {}

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
  t,
  uid
}: ISlidesTrackSelector) {
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

const mapStateToProps = (state: IAianaState) => ({
  currentLanguage: state.slides.language,
  mediaElement: state.player.mediaElement,
  slidesTracks: state.slides.slidesTracks
});

const mapDispatchToProps = (dispatch: CDispatch) => ({
  selectedTrackChangedHandler: (evt: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateActiveSlidesTrack(evt.currentTarget.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withI18n()(withUniqueId(SlidesTrackSelector)));
