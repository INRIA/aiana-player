import * as React from 'react';
import { connect } from 'react-redux';
import { addChaptersTrack, setChapterText } from '../../actions/chapters';
import { TRACK_KIND_CHAPTERS, TRACK_MODE_HIDDEN } from '../../constants';
import { IAianaState } from '../../reducers';
import { IChaptersTrack } from '../../reducers/chapters';
import {
  getLastActiveCueText,
  IRawChaptersTrack,
  isActiveTrack,
  rawChaptersTrack
} from '../../utils/media';

interface IStateProps {
  chaptersTracks: IRawChaptersTrack[];
  language: string;
}

interface IDispatchProps {
  addChaptersTrack(chaptersTrack: IRawChaptersTrack): void;
  setChapterText(text?: string): any;
}

export interface IMediaChapterTrack
  extends IStateProps,
    IChaptersTrack,
    IDispatchProps {}

class MediaChapterTrack extends React.Component<IMediaChapterTrack> {
  private trackRef = React.createRef<HTMLTrackElement>();

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
    // browser will set track `mode` to disabled.
    this.trackRef.current!.track.mode = TRACK_MODE_HIDDEN;
    this.trackRef.current!.addEventListener('load', this.loadHandler);
    this.trackRef.current!.track.addEventListener(
      'cuechange',
      this.cueChangeHandler
    );
  }

  componentDidUpdate(prevProps: IMediaChapterTrack) {
    const prevActiveTrack = prevProps.chaptersTracks.find(isActiveTrack);
    const activeTrack = this.props.chaptersTracks.find(isActiveTrack);

    // this track is active, but wasn't so at previous state.
    if (prevActiveTrack && prevActiveTrack.label !== activeTrack!.label) {
      this.cueChangeHandler();
    }
  }

  componentWillUnmount() {
    this.trackRef.current!.removeEventListener('load', this.loadHandler);
    this.trackRef.current!.removeEventListener('cuechange', this.loadHandler);
  }

  private isActive() {
    const activeTrack = this.props.chaptersTracks.find(isActiveTrack);

    return activeTrack && activeTrack.label === this.trackRef.current!.label;
  }

  private cueChangeHandler = () => {
    if (!this.isActive()) {
      return;
    }

    const track = this.trackRef.current!.track;
    const currentText = getLastActiveCueText(track);
    this.props.setChapterText(currentText);
  };

  private loadHandler = () => {
    const chaptersTrack = rawChaptersTrack(
      this.trackRef.current!.track,
      this.props.language
    );
    this.props.addChaptersTrack(chaptersTrack);
  };
}

function mapStateToProps(state: IAianaState) {
  return {
    chaptersTracks: state.chapters.chaptersTracks,
    language: state.chapters.language
  };
}

const mapDispatchToProps = {
  addChaptersTrack,
  setChapterText
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaChapterTrack);
