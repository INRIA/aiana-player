import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveSlidesTrack } from 'src/actions/slides';
import { IAianaState } from 'src/reducers';
import { CDispatch } from 'src/store';
import { IRawSlidesTrack } from 'src/utils/media';
import { uuid } from 'src/utils/ui';

interface IStateProps {
  slidesTracks: IRawSlidesTrack[];
  currentLanguage: string;
  mediaElement?: HTMLMediaElement;
}

interface IDispatchProps {
  selectedTrackChangedHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface ISlidesTrackSelector
  extends IStateProps,
    IDispatchProps,
    InjectedTranslateProps {}

export function getSelectedValue(
  tracks: IRawSlidesTrack[],
  language: string
): string {
  const selectedTrack = tracks.find((track) => {
    return track.language === language;
  });

  return selectedTrack ? selectedTrack.language : '';
}

const SlidesTrackSelector: React.SFC<ISlidesTrackSelector> = ({
  slidesTracks,
  currentLanguage,
  mediaElement,
  selectedTrackChangedHandler,
  t
}) => {
  if (!mediaElement) {
    return null;
  }

  const id = uuid();

  return (
    <React.Fragment>
      <span id={id}>{t('preferences.slidestrack.label')}</span>
      <select
        aria-labelledby={id}
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
};

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
)(translate()(SlidesTrackSelector));
