import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { addChaptersTrack, setChapterText } from '../../actions/chapters';
import { TRACK_KIND_CHAPTERS, TRACK_MODE_HIDDEN } from '../../constants/tracks';
import { IAianaState } from '../../reducers';
import { IChaptersTrack } from '../../reducers/chapters';
import {
  getLastActiveCueText,
  IRawTrackExt,
  isActiveTrack,
  rawChaptersTrack
} from '../../utils/media';

interface IStateProps {
  chaptersTracks: IRawTrackExt[];
  language: string;
}

interface IDispatchProps {
  addChaptersTrack(chaptersTrack: IRawTrackExt): void;
  setChapterText(text?: string): void;
}

export interface IMediaChapterTrack
  extends IStateProps,
    IChaptersTrack,
    IDispatchProps {}

class MediaChapterTrack extends Component<IMediaChapterTrack> {
  trackRef = createRef<HTMLTrackElement>();

  render() {
    return (
      <track
        kind={TRACK_KIND_CHAPTERS}
        label={this.props.label}
        ref={this.trackRef}
        src={this.props.src}
        srcLang={this.props.srcLang}
      />
    );
  }

  componentDidMount() {
    const { current } = this.trackRef;

    if (!current) return;

    // browser will set track `mode` to disabled.
    current.track.mode = TRACK_MODE_HIDDEN;
    current.addEventListener('load', this.loadHandler);
    current.track.addEventListener('cuechange', this.cueChangeHandler);
  }

  componentDidUpdate(prevProps: IMediaChapterTrack) {
    const prevActiveTrack = prevProps.chaptersTracks.find(isActiveTrack);
    const activeTrack = this.props.chaptersTracks.find(isActiveTrack);

    // this track is active, but wasn't so at previous state.
    if (
      (activeTrack && !prevActiveTrack) ||
      (activeTrack &&
        prevActiveTrack &&
        prevActiveTrack.label !== activeTrack.label)
    ) {
      this.cueChangeHandler();
    }
  }

  componentWillUnmount() {
    const { current } = this.trackRef;

    if (!current) return;

    current.removeEventListener('load', this.loadHandler);
    current.removeEventListener('cuechange', this.loadHandler);
  }

  cueChangeHandler = () => {
    const { current } = this.trackRef;

    if (!current) return;

    const activeTrack = this.props.chaptersTracks.find(isActiveTrack);
    const isActive = activeTrack && activeTrack.label === current.label;

    if (!isActive) {
      return;
    }

    const track = current.track;
    const currentText = getLastActiveCueText(track);
    this.props.setChapterText(currentText);
  };

  loadHandler = () => {
    const { current } = this.trackRef;

    if (!current) return;

    const chaptersTrack = rawChaptersTrack(current.track, this.props.language);
    this.props.addChaptersTrack(chaptersTrack);
  };
}

function mapState(state: IAianaState) {
  return {
    chaptersTracks: state.chapters.chaptersTracks,
    language: state.chapters.language
  };
}

const mapDispatch = {
  addChaptersTrack,
  setChapterText
};

export default connect(
  mapState,
  mapDispatch
)(MediaChapterTrack);
