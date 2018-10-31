import * as React from 'react';
import { connect } from 'react-redux';
import { addChaptersTrack } from 'src/actions/chapters';
import { TRACK_KIND_CHAPTERS } from 'src/constants';
import { IChaptersTrack } from 'src/reducers/chapters';
import { IRawChapterTrack, rawChapterTrack } from 'src/utils/media-tracks';

interface IDispatchProps {
  addChaptersTrack(chaptersTrack: IRawChapterTrack): void;
}

export interface IMediaChapterTrack extends IChaptersTrack, IDispatchProps {}

class MediaChapterTrack extends React.Component<IMediaChapterTrack> {
  private trackRef = React.createRef<HTMLTrackElement>();

  public render() {
    const { label, src, srcLang } = this.props;

    return (
      <track
        kind={TRACK_KIND_CHAPTERS}
        label={label}
        ref={this.trackRef}
        src={src}
        srcLang={srcLang}
      />
    );
  }

  public componentDidMount() {
    if (!this.trackRef.current) {
      return;
    }

    // browser will set track `mode` to disabled.
    this.trackRef.current.track.mode = 'hidden';
    this.trackRef.current.addEventListener('load', this.loadHandler);
  }

  public componentWillUnmount() {
    if (!this.trackRef.current) {
      return;
    }

    this.trackRef.current.removeEventListener('load', this.loadHandler);
  }

  private loadHandler = () => {
    const { addChaptersTrack: addChaptersTrackAction } = this.props;

    if (!this.trackRef.current) {
      return;
    }

    const chaptersTrack = rawChapterTrack(this.trackRef.current.track);
    addChaptersTrackAction(chaptersTrack);
  };
}

const mapDispatchToProps = {
  addChaptersTrack
};

export default connect(
  null,
  mapDispatchToProps
)(MediaChapterTrack);
