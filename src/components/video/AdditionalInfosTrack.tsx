import React from 'react';
import { connect } from 'react-redux';
import {
  addAdditionalInformationTrack,
  setAdditionalInformationText
} from '../../actions/player';
import { TRACK_KIND_METADATA, TRACK_MODE_HIDDEN } from '../../constants';
import { IAianaState } from '../../reducers';
import {
  getLastActiveCueText,
  IRawMetadataTrack,
  rawTextTrack
} from '../../utils/media';

interface IProps {
  label?: string;
  src?: string;
  srcLang?: string;
}

interface IStateProps {
  metadataTracks: IRawMetadataTrack[];
}

interface IDispatchProps {
  addMetadataTrack(track: IRawMetadataTrack): void;
  setAdditionalInformationsText(text?: string): void;
}

export interface IChapterTrack extends IProps, IStateProps, IDispatchProps {}

class AdditionalInfosTrack extends React.Component<IChapterTrack> {
  private trackRef = React.createRef<HTMLTrackElement>();

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

  private loadHandler = () => {
    const metadataTrack = rawTextTrack(this.trackRef.current!.track);
    this.props.addMetadataTrack(metadataTrack);
  };

  private cueChangeHandler = () => {
    const track = this.trackRef.current!.track;
    const currentText = getLastActiveCueText(track);
    this.props.setAdditionalInformationsText(currentText);
  };
}

function mapState(state: IAianaState) {
  return {
    metadataTracks: state.player.metadataTracks
  };
}

const mapDispatch = {
  addMetadataTrack: addAdditionalInformationTrack,
  setAdditionalInformationsText: setAdditionalInformationText
};

export default connect(
  mapState,
  mapDispatch
)(AdditionalInfosTrack);
