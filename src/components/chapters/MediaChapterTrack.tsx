import * as React from 'react';
import { connect } from 'react-redux';
import { addChaptersTrack } from 'src/actions/chapters';
import { TRACK_KIND_CHAPTERS, TRACK_MODE_HIDDEN } from 'src/constants';
import { IChaptersTrack } from 'src/reducers/chapters';
import { IRawChapterTrack, rawChapterTrack } from 'src/utils/media-tracks';

interface IDispatchProps {
  addChaptersTrack(chaptersTrack: IRawChapterTrack): void;
}

export interface IMediaChapterTrack extends IChaptersTrack, IDispatchProps {}

class MediaChapterTrack extends React.Component<IMediaChapterTrack> {
  private trackRef = React.createRef<HTMLTrackElement>();

  public render() {
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

  public componentDidMount() {
    if (!this.trackRef.current) {
      return;
    }

    // browser will set track `mode` to disabled.
    this.trackRef.current.track.mode = TRACK_MODE_HIDDEN;
    this.trackRef.current.addEventListener('load', this.loadHandler);
  }

  public componentWillUnmount() {
    if (!this.trackRef.current) {
      return;
    }

    this.trackRef.current.removeEventListener('load', this.loadHandler);
  }

  private loadHandler = () => {
    if (!this.trackRef.current) {
      return;
    }

    const chaptersTrack = rawChapterTrack(this.trackRef.current.track);
    this.props.addChaptersTrack(chaptersTrack);
  };
}

const mapDispatchToProps = {
  addChaptersTrack
};

export default connect(
  null,
  mapDispatchToProps
)(MediaChapterTrack);
