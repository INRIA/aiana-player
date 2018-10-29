import * as React from 'react';
import { connect } from 'react-redux';
import { addMetadataTrack, setAdditionalInfosText } from 'src/actions/player';
import { DEFAULT_LANG, TRACK_KIND_METADATA } from 'src/constants';
import { IAianaState } from 'src/reducers/index';
import { IRawMetadataTrack, rawTextTrack } from 'src/utils/media-tracks';

interface IProps {
  label?: string | undefined;
  src?: string;
  srcLang?: string | undefined;
}

interface IStateProps {
  metadataTracks: IRawMetadataTrack[];
}

interface IDispatchProps {
  addMetadataTrack(track: IRawMetadataTrack): void;
  updateAdditionalInfosText(text: string | undefined): void;
}

export interface IChapterTrack extends IProps, IStateProps, IDispatchProps {}

class AdditionalInfosTrack extends React.Component<IChapterTrack> {
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
    this.trackRef.current.track.mode = 'hidden';
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

    const metadataTrack = rawTextTrack(this.trackRef.current.track);
    this.props.addMetadataTrack(metadataTrack);
  };

  private cueChangeHandler = () => {
    if (!this.trackRef.current) {
      return;
    }

    const currentCue = this.trackRef.current.track.activeCues[0];
    const currentText = currentCue ? currentCue.text : undefined;
    this.props.updateAdditionalInfosText(currentText);
  };
}

const mapStateToProps = (state: IAianaState) => ({
  metadataTracks: state.player.metadataTracks
});

const mapDispatchToProps = {
  addMetadataTrack,
  updateAdditionalInfosText: setAdditionalInfosText
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdditionalInfosTrack);
