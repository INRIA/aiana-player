import * as React from 'react';
import { connect } from 'react-redux';
import {
  addMetadataTrack,
  setAdditionalInformationsText
} from 'src/actions/player';
import {
  DEFAULT_LANG,
  TRACK_KIND_METADATA,
  TRACK_MODE_HIDDEN
} from 'src/constants';
import { IAianaState } from 'src/reducers/index';
import {
  getLastActiveCueText,
  IRawMetadataTrack,
  rawTextTrack
} from 'src/utils/media';

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
  updateAdditionalInfosText(text?: string): void;
}

export interface IChapterTrack extends IProps, IStateProps, IDispatchProps {}

class AdditionalInfosTrack extends React.Component<IChapterTrack> {
  public static defaultProps: IProps = {
    srcLang: DEFAULT_LANG
  };

  private trackRef = React.createRef<HTMLTrackElement>();

  public render() {
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

  public componentDidMount() {
    // browser will set track `mode` to disabled.
    this.trackRef.current!.track.mode = TRACK_MODE_HIDDEN;
    this.trackRef.current!.addEventListener('load', this.loadHandler);
    this.trackRef.current!.track.addEventListener(
      'cuechange',
      this.cueChangeHandler
    );
  }

  public componentWillUnmount() {
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
    this.props.updateAdditionalInfosText(currentText);
  };
}

const mapStateToProps = (state: IAianaState) => ({
  metadataTracks: state.player.metadataTracks
});

const mapDispatchToProps = {
  addMetadataTrack,
  updateAdditionalInfosText: setAdditionalInformationsText
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdditionalInfosTrack);
