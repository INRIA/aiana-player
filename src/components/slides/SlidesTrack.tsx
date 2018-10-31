import * as React from 'react';
import { connect } from 'react-redux';
import { addSlidesTrack, setSlidesText } from 'src/actions/slides';
import {
  DEFAULT_LANG,
  TRACK_KIND_METADATA,
  TRACK_MODE_HIDDEN
} from 'src/constants';
import { IRawMetadataTrack, rawTextTrack } from 'src/utils/media-tracks';

interface IProps {
  label?: string | undefined;
  src?: string;
  srcLang?: string | undefined;
}

interface IDispatchProps {
  addSlidesTrack(track: IRawMetadataTrack): void;
  setSlidesText(text: string | undefined): void;
}

export interface ISlideTrack extends IProps, IDispatchProps {}

class SlidesTrack extends React.Component<ISlideTrack> {
  public static defaultProps: IProps = {
    srcLang: DEFAULT_LANG
  };

  private trackRef = React.createRef<HTMLTrackElement>();

  public render() {
    const { label, src, srcLang } = this.props;

    if (!src) {
      return null;
    }

    return (
      <track
        kind={TRACK_KIND_METADATA}
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
    this.trackRef.current.track.mode = TRACK_MODE_HIDDEN;
    this.trackRef.current.addEventListener('load', this.loadHandler);
    this.trackRef.current.track.addEventListener(
      'cuechange',
      this.cueChangeHandler
    );
  }

  public componentWillUnmount() {
    if (!this.trackRef.current) {
      return;
    }

    this.trackRef.current.removeEventListener('load', this.loadHandler);
    this.trackRef.current.track.removeEventListener(
      'cuechange',
      this.cueChangeHandler
    );
  }

  private loadHandler = () => {
    if (!this.trackRef.current) {
      return;
    }

    const slidesTrack = rawTextTrack(this.trackRef.current.track);
    this.props.addSlidesTrack(slidesTrack);
  };

  private cueChangeHandler = () => {
    if (!this.trackRef.current) {
      return;
    }

    const currentCue = this.trackRef.current.track.activeCues[0];
    const currentText = currentCue ? currentCue.text : undefined;
    this.props.setSlidesText(currentText);
  };
}

const mapDispatchToProps = {
  addSlidesTrack,
  setSlidesText
};

export default connect(
  null,
  mapDispatchToProps
)(SlidesTrack);
