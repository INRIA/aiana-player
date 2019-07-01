import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers';
import {
  getSelectedChaptersTrackCues,
  IChaptersState
} from '../../reducers/chapters';
import {
  getSelectedSubtitlesTrackCues,
  ISubtitlesState
} from '../../reducers/subtitles';
import withWidget from '../../hocs/with-widget';
import styled from '../../utils/styled-components';
import { IMediaCue } from '../../utils/media';
import SubtitlesCues from './SubtitlesCues';
import { useTranslation } from 'react-i18next';
import { requestSeek } from '../../actions/player';
import DownloadTranscript from './DownloadTranscript';

interface IMapState {
  chapters: IChaptersState;
  currentTime: number;
  mediaSelector: string;
  subtitles: ISubtitlesState;
}

interface IMapDispatch {
  requestSeek(mediaSelector: string, seekingTime: number): void;
}

interface ITranscript extends IMapState, IMapDispatch {}

export interface IMergedCues extends IMediaCue {
  subtitlesCues?: IMediaCue[];
}

const StyledArticle = styled.article`
  padding: 1em;

  color: ${(props) => props.theme.bg};

  .aip-transcript__chapter:hover {
    cursor: pointer;
    background: ${(props) => props.theme.highlight};
  }
`;

/**
 * Filters cues depending on the start time.
 * Since some cues timeframes can overlap the chapters', the end time is not
 * checked to avoid trimming content.
 *
 * @param start {number} lower start time boundary
 * @param end {number} upper start time boundary
 * @param cues {IMediaCue[]} cues to filter
 */
function getRelatedSubtitles(start: number, end: number, cues: IMediaCue[]) {
  return cues.filter((cue) => cue.startTime >= start && cue.startTime < end);
}

function mergeCues(
  cues?: IMediaCue[],
  subtitlesCues?: IMediaCue[]
): IMergedCues[] {
  if (!cues && !subtitlesCues) {
    return [];
  }

  if (!cues && subtitlesCues) {
    return subtitlesCues;
  }

  if (cues && !subtitlesCues) {
    return cues;
  }

  return cues!.map((cue) => {
    return {
      ...cue,
      subtitlesCues: getRelatedSubtitles(
        cue.startTime,
        cue.endTime,
        subtitlesCues!
      )
    };
  });
}

// FIXME: buttons or spans? Are clickable spans accessible?
function Transcript(props: ITranscript) {
  const [t] = useTranslation();
  const chaptersCues = getSelectedChaptersTrackCues(props.chapters);
  const subtitlesCues = getSelectedSubtitlesTrackCues(props.subtitles);

  const sortedCues = mergeCues(chaptersCues, subtitlesCues);

  return (
    <StyledArticle className="aip-transcript">
      <h2>{t('transcript.title')}</h2>

      <DownloadTranscript />

      <div className="aip-transcript__text">
        {chaptersCues &&
          sortedCues.map((cue) => (
            <Fragment key={`chapter_${cue.startTime}_${cue.endTime}`}>
              <h3 className="aip-transcript__chapter">{cue.text}</h3>
              <SubtitlesCues
                clickHandler={props.requestSeek}
                cues={cue.subtitlesCues}
                currentTime={props.currentTime}
                mediaSelector={props.mediaSelector}
              />
            </Fragment>
          ))}

        {!chaptersCues && (
          <SubtitlesCues
            clickHandler={props.requestSeek}
            cues={subtitlesCues}
            currentTime={props.currentTime}
            mediaSelector={props.mediaSelector}
          />
        )}
      </div>
    </StyledArticle>
  );
}

function mapState(state: IAianaState) {
  return {
    chapters: state.chapters,
    currentTime: state.player.currentTime,
    subtitles: state.subtitles,
    mediaSelector: state.player.mediaSelector
  };
}
const mapDispatch = {
  requestSeek
};

export default connect(
  mapState,
  mapDispatch
)(withWidget(Transcript));
