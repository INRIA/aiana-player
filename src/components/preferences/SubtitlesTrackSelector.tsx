import * as React from 'react';
import { I18nContextValues, withI18n } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveSubtitlesTrack } from '../../actions/subtitles';
import { IAianaState } from '../../reducers/index';
import { CDispatch } from '../../store';
import {
  IRawSubtitlesTrack,
  isActiveTrack,
  isDisplayableTrack
} from '../../utils/media';
import { uuid } from '../../utils/ui';

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
    I18nContextValues {}

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
)(withI18n()(SubtitlesTrackSelector));
