import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { addSlidesTrack, setSlidesText } from '../../actions/slides';
import { TRACK_KIND_METADATA, TRACK_MODE_HIDDEN } from '../../constants/tracks';
import { IAianaState } from '../../reducers';
import {
  getLastActiveCueText,
  IRawTrack,
  rawSlidesTrack
} from '../../utils/media';

interface IProps {
  label?: string;
  src?: string;
  srcLang?: string;
}

interface IStateProps {
  language: string;
  slidesTracks: IRawTrack[];
}

interface IDispatchProps {
  addSlidesTrack(track: IRawTrack): void;
  setSlidesText(text?: string): void;
}

interface ISlideTrackProps extends IProps, IStateProps, IDispatchProps {}

class SlidesTrack extends Component<ISlideTrackProps> {
  trackRef = createRef<HTMLTrackElement>();

  render() {
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

  componentDidMount() {
    // browser will set track `mode` to disabled.
    this.trackRef.current!.track.mode = TRACK_MODE_HIDDEN;
    this.trackRef.current!.addEventListener('load', this.loadHandler);
    this.trackRef.current!.track.addEventListener(
      'cuechange',
      this.cueChangeHandler
    );
  }

  componentWillUnmount() {
    this.trackRef.current!.removeEventListener('load', this.loadHandler);
    this.trackRef.current!.track.removeEventListener(
      'cuechange',
      this.cueChangeHandler
    );
  }

  componentDidUpdate(prevProps: ISlideTrackProps) {
    const prevActiveTrack = prevProps.slidesTracks.find((track) => {
      return track.language === prevProps.language;
    });
    const activeTrack = this.props.slidesTracks.find((track) => {
      return track.language === this.props.language;
    });

    // this track is active, but wasn't so at previous state.
    if (
      this.props.srcLang === this.props.language &&
      prevActiveTrack &&
      prevActiveTrack.label !== activeTrack!.label
    ) {
      const track = this.trackRef.current!.track;
      const currentText = getLastActiveCueText(track);
      this.props.setSlidesText(currentText);
    }
  }

  loadHandler = () => {
    const slidesTrack: IRawTrack = rawSlidesTrack(this.trackRef.current!.track);
    this.props.addSlidesTrack(slidesTrack);
  };

  cueChangeHandler = () => {
    if (this.props.srcLang === this.props.language) {
      const track = this.trackRef.current!.track;
      const currentText = getLastActiveCueText(track);
      this.props.setSlidesText(currentText);
    }
  };
}

function mapState(state: IAianaState) {
  return {
    language: state.slides.language,
    slidesTracks: state.slides.slidesTracks
  };
}

const mapDispatch = {
  addSlidesTrack,
  setSlidesText
};

export default connect(
  mapState,
  mapDispatch
)(SlidesTrack);
