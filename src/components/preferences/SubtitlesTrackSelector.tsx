import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveSubtitlesTrack } from 'src/actions/subtitles';
import { IAianaState } from 'src/reducers/index';
import { CDispatch } from 'src/store';
import {
  IRawSubtitlesTrack,
  isActiveTrack,
  isDisplayableTrack
} from 'src/utils/media';
import { uuid } from 'src/utils/ui';

interface IStateProps {
  subtitlesTracks: IRawSubtitlesTrack[];
  mediaElement?: HTMLMediaElement;
}

interface IDispatchProps {
  selectedTrackChangedHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface ISubtitlesTrackSelector
  extends IStateProps,
    IDispatchProps,
    InjectedTranslateProps {}

export function getSelectedValue(tracks: IRawSubtitlesTrack[]): string {
  const selectedTrack = tracks.find(isActiveTrack);

  return selectedTrack ? selectedTrack.language : '';
}

const SubtitlesTrackSelector: React.SFC<ISubtitlesTrackSelector> = ({
  mediaElement,
  selectedTrackChangedHandler,
  t,
  subtitlesTracks
}) => {
  if (!mediaElement) {
    return null;
  }

  const id = uuid();

  return (
    <React.Fragment>
      <span id={id}>{t('preferences.subtitlestrack.label')}</span>
      <select
        aria-labelledby={id}
        onChange={selectedTrackChangedHandler}
        value={getSelectedValue(subtitlesTracks)}
      >
        <option value="">{t('preferences.subtitlestrack.no_subtitle')}</option>
        {subtitlesTracks.filter(isDisplayableTrack).map(({ language }) => (
          <option key={language} value={language}>
            {t(`languages.${language}`)}
          </option>
        ))}
      </select>
    </React.Fragment>
  );
};

const mapStateToProps = (state: IAianaState) => ({
  mediaElement: state.player.mediaElement,
  subtitlesTracks: state.subtitles.subtitlesTracks
});

const mapDispatchToProps = (dispatch: CDispatch) => ({
  selectedTrackChangedHandler: (evt: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateActiveSubtitlesTrack(evt.currentTarget.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(SubtitlesTrackSelector));
