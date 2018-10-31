import * as React from 'react';
import { connect } from 'react-redux';
import { setSubtitleText } from 'src/actions/player';
import {
  DEFAULT_LANG,
  TRACK_KIND_SUBTITLES,
  TRACK_MODE_HIDDEN
} from 'src/constants';
import { IAianaState } from 'src/reducers/index';
import { IRawTextTrack, isActiveTrack } from 'src/utils/media-tracks';

export interface ITrack {
  isDefault?: boolean;
  kind?: TextTrackKind;
  label?: string;
  src?: string;
  srcLang?: string;
}

interface IStateProps {
  nativeControls: boolean;
  textTracks: IRawTextTrack[];
}

interface IDispatchProps {
  updateSubtitleText(text?: string): void;
}

interface ITrackProps extends ITrack, IStateProps, IDispatchProps {}

class VideoTextTrack extends React.Component<ITrackProps> {
  public static defaultProps: ITrack = {
    isDefault: false,
    kind: TRACK_KIND_SUBTITLES,
    srcLang: DEFAULT_LANG
  };

  private trackRef = React.createRef<HTMLTrackElement>();

  public render() {
    const { isDefault, kind, label, src, srcLang } = this.props;

    if (!src) {
      return null;
    }

    return (
      <track
        default={isDefault}
        kind={kind}
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
    this.toggleNativeTextTrack(this.props.nativeControls);
    const t = this.trackRef.current.track;
    t.addEventListener('cuechange', this.cueChangeHandler);
  }

  public componentWillUnmount() {
    if (!this.trackRef.current) {
      return;
    }
    const t = this.trackRef.current.track;
    t.removeEventListener('cuechange', this.cueChangeHandler);
  }

  public componentDidUpdate(prevProps: ITrackProps) {
    const { nativeControls, textTracks } = prevProps;

    if (!this.trackRef.current) {
      return;
    }

    if (nativeControls) {
      this.toggleNativeTextTrack(this.props.nativeControls);
    }

    const prevActiveTrack = textTracks.find(isActiveTrack);
    const activeTrack = this.props.textTracks.find(isActiveTrack);

    // this track is active, but wasn't so at previous state.
    if (
      this.isActive() &&
      prevActiveTrack &&
      prevActiveTrack.label !== activeTrack!.label
    ) {
      const currentCue = this.trackRef.current.track.activeCues[0];
      const currentText = currentCue ? currentCue.text : undefined;
      this.props.updateSubtitleText(currentText);
    }
  }

  private isActive() {
    if (!this.trackRef.current) {
      return false;
    }

    const activeTrack = this.props.textTracks.find(isActiveTrack);

    if (!activeTrack) {
      return false;
    }

    return activeTrack.label === this.trackRef.current.label;
  }

  private cueChangeHandler = () => {
    if (!this.isActive()) {
      return;
    }

    const currentCue = this.trackRef.current!.track.activeCues[0];
    const currentText = currentCue ? currentCue.text : undefined;
    this.props.updateSubtitleText(currentText);
  };

  private toggleNativeTextTrack(nativeControls: boolean) {
    if (!nativeControls && this.trackRef.current) {
      this.trackRef.current.track.mode = TRACK_MODE_HIDDEN;
    }
  }
}

const mapStateToProps = (state: IAianaState) => ({
  nativeControls: state.player.nativeControls,
  textTracks: state.player.textTracks
});

const mapDispatchToProps = {
  updateSubtitleText: setSubtitleText
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoTextTrack);
