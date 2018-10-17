import * as React from 'react';
import { connect } from 'react-redux';
import { setSubtitleText } from '../../actions/player';
import { DEFAULT_LANG } from '../../constants';
import { IAianaState } from '../../reducers/index';
import { IRawTextTrack } from '../../utils/media-tracks';

export interface ITrack {
  isDefault?: boolean;
  kind?: TextTrackKind;
  label?: string | undefined;
  src?: string;
  srcLang?: string | undefined;
}

interface IStateProps {
  nativeControls: boolean;
  textTracks: IRawTextTrack[];
}

interface IDispatchProps {
  updateSubtitleText(text: string | undefined): void;
}

interface ITrackProps extends ITrack, IStateProps, IDispatchProps {}

class VideoTextTrack extends React.Component<ITrackProps> {
  private trackRef = React.createRef<HTMLTrackElement>();

  public render() {
    const {
      isDefault = false,
      kind = 'subtitle',
      label,
      src,
      srcLang = DEFAULT_LANG
    } = this.props;

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
    this.toggleNativeTextTrack(this.props.nativeControls);
    const t = this.trackRef.current!.track;
    t.addEventListener('cuechange', this.cueChangeHandler);
  }

  public componentWillUnmount() {
    const t = this.trackRef.current!.track;
    t.removeEventListener('cuechange', this.cueChangeHandler);
  }

  public componentDidUpdate(prevProps: ITrackProps) {
    const { nativeControls } = prevProps;

    if (!this.trackRef.current) {
      return;
    }

    if (nativeControls) {
      this.toggleNativeTextTrack(this.props.nativeControls);
    }

    const prevActiveTrack = prevProps.textTracks.find((track) => track.active);
    const activeTrack = this.props.textTracks.find((track) => track.active);

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

    const activeTrack = this.props.textTracks.find((track) => track.active);

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
      this.trackRef.current.track.mode = 'hidden';
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
