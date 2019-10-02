import React, { createRef, Component } from 'react';
import { connect } from 'react-redux';
import {
  addAdditionalInformationTrack,
  setAdditionalInformationText
} from '../../actions/additional-information';
import { TRACK_KIND_METADATA, TRACK_MODE_HIDDEN } from '../../constants/tracks';
import {
  getLastActiveCueText,
  IRawTrackExt,
  rawTextTrack,
  IRawTrack
} from '../../utils/media';
import { IAianaState } from '../../reducers';

interface IProps {
  label?: string;
  src?: string;
  srcLang?: string;
}

interface IStateProps {
  language: string;
  tracks: IRawTrack[];
}

interface IDispatchProps {
  addAdditionalInformationTrack(track: IRawTrackExt): void;
  setAdditionalInformationText(text?: string): void;
}

interface IAdditionalInformationTrack
  extends IProps,
    IStateProps,
    IDispatchProps {}

class AdditionalInfoTrack extends Component<IAdditionalInformationTrack> {
  trackRef = createRef<HTMLTrackElement>();

  render() {
    const { label, src, srcLang } = this.props;

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

  componentDidUpdate(prevProps: IAdditionalInformationTrack) {
    const prevActiveTrack = prevProps.tracks.find((track) => {
      return track.language === prevProps.language;
    });
    const activeTrack = this.props.tracks.find((track) => {
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
      this.props.setAdditionalInformationText(currentText);
    }
  }

  loadHandler = () => {
    const metadataTrack = rawTextTrack(this.trackRef.current!.track);
    this.props.addAdditionalInformationTrack(metadataTrack);
  };

  cueChangeHandler = () => {
    if (this.props.srcLang === this.props.language) {
      const track = this.trackRef.current!.track;
      const currentText = getLastActiveCueText(track);
      this.props.setAdditionalInformationText(currentText);
    }
  };
}

function mapState(state: IAianaState) {
  return {
    language: state.additionalInformation.language,
    tracks: state.additionalInformation.tracks
  };
}

const mapDispatch = {
  addAdditionalInformationTrack,
  setAdditionalInformationText
};

export default connect(
  mapState,
  mapDispatch
)(AdditionalInfoTrack);
