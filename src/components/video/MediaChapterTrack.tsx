import * as React from 'react';
import { connect } from 'react-redux';
import { addChaptersTrack } from '../../actions/player';
import { TRACK_KIND_CHAPTERS } from '../../constants';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store';
import { IRawChapterTrack, rawChapterTrack } from '../../utils/media-tracks';

export interface IChapterTrack {
  label?: string | undefined;
  src?: string;
  srcLang?: string | undefined;
}

interface IConnectedChaptersTrack extends IChapterTrack, IConnectedReduxProps {
  chaptersTracks: IRawChapterTrack[];
}

class ChapterTrack extends React.Component<IConnectedChaptersTrack> {
  private trackRef = React.createRef<HTMLTrackElement>();

  public render() {
    const { label, src, srcLang } = this.props;

    if (!src) {
      return null;
    }

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
    const { dispatch } = this.props;

    if (!this.trackRef.current) {
      return;
    }

    dispatch(addChaptersTrack(rawChapterTrack(this.trackRef.current.track)));
  };
}

export default connect((state: IAianaState) => ({
  chaptersTracks: state.player.chaptersTracks
}))(ChapterTrack);
