import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveChaptersTrack } from 'src/actions/chapters';
import { IAianaState } from 'src/reducers';
import { CDispatch } from 'src/store';
import { IRawChaptersTrack } from 'src/utils/media';
import { uuid } from 'src/utils/ui';

interface IStateProps {
  chaptersTracks: IRawChaptersTrack[];
  language: string;
  mediaElement?: HTMLMediaElement;
}

interface IDispatchProps {
  selectedTrackChangedHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface IChaptersTrackSelector
  extends IStateProps,
    IDispatchProps,
    InjectedTranslateProps {}

const ChaptersTrackSelector: React.SFC<IChaptersTrackSelector> = ({
  chaptersTracks,
  language,
  mediaElement,
  selectedTrackChangedHandler,
  t
}) => {
  if (!mediaElement) {
    return null;
  }

  const selectedTrack = chaptersTracks.find((track) => {
    return track.language === language;
  });
  const selectedValue = selectedTrack ? selectedTrack.language : '';

  const id = uuid();

  return (
    <React.Fragment>
      <span id={id}>{t('preferences.chapterstrack.label')}</span>
      <select
        aria-labelledby={id}
        onChange={selectedTrackChangedHandler}
        value={selectedValue}
      >
        {chaptersTracks.map((track) => (
          <option key={track.language} value={track.language}>
            {t(`languages.${track.language}`)}
          </option>
        ))}
      </select>
    </React.Fragment>
  );
};

const mapStateToProps = (state: IAianaState) => ({
  chaptersTracks: state.chapters.chaptersTracks,
  language: state.chapters.language,
  mediaElement: state.player.mediaElement
});

const mapDispatchToProps = (dispatch: CDispatch) => ({
  selectedTrackChangedHandler: (evt: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateActiveChaptersTrack(evt.currentTarget.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(ChaptersTrackSelector));
