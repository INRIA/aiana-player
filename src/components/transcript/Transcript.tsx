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
import { seek } from '../../actions/player';
import DownloadTranscript from './DownloadTranscript';
import ChapterCue from './ChapterCue';

interface IMapState {
  chapters: IChaptersState;
  currentTime: number;
  subtitles: ISubtitlesState;
}

interface IMapDispatch {
  seek(seekingTime: number): void;
}

interface ITranscript extends IMapState, IMapDispatch {}

export interface IMergedCues extends IMediaCue {
  subtitlesCues?: IMediaCue[];
}

const Section = styled.section`
  padding: 1em;

  color: ${(props) => props.theme.bg};
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
    <Section className="aip-transcript" aria-label={t('transcript.title')}>
      <DownloadTranscript />

      <div className="aip-transcript__text">
        {chaptersCues &&
          sortedCues.map((cue) => (
            <Fragment key={`chapter_${cue.startTime}_${cue.endTime}`}>
              <ChapterCue
                clickHandler={props.seek}
                cue={cue}
                currentTime={props.currentTime}
              />

              <SubtitlesCues
                clickHandler={props.seek}
                cues={cue.subtitlesCues}
                currentTime={props.currentTime}
              />
            </Fragment>
          ))}

        {!chaptersCues && (
          <SubtitlesCues
            clickHandler={props.seek}
            cues={subtitlesCues}
            currentTime={props.currentTime}
          />
        )}
      </div>
    </Section>
  );
}

function mapState(state: IAianaState) {
  return {
    chapters: state.chapters,
    currentTime: state.player.currentTime,
    subtitles: state.subtitles
  };
}
const mapDispatch = {
  seek
};

export default connect(
  mapState,
  mapDispatch
)(withWidget(Transcript));
