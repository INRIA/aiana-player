import * as React from 'react';
import { connect } from 'react-redux';
import { addSubtitlesTrack, setSubtitlesText } from 'src/actions/subtitles';
import {
  DEFAULT_LANG,
  TRACK_KIND_SUBTITLES,
  TRACK_MODE_HIDDEN
} from 'src/constants';
import { IAianaState } from 'src/reducers/index';
import {
  IRawSubtitlesTrack,
  isActiveTrack,
  rawSubtitlesTrack
} from 'src/utils/media';

export interface ITrack {
  isDefault?: boolean;
  kind?: TextTrackKind;
  label?: string;
  src?: string;
  srcLang?: string;
}

interface IStateProps {
  nativeControls: boolean;
  subtitlesTracks: IRawSubtitlesTrack[];
}

interface IDispatchProps {
  addSubtitlesTrack: (track: IRawSubtitlesTrack) => void;
  updateSubtitleText: (text?: string) => void;
}

interface ITrackProps extends ITrack, IStateProps, IDispatchProps {}

class MediaSubtitlesTrack extends React.Component<ITrackProps> {
  private trackRef = React.createRef<HTMLTrackElement>();

  constructor(props: ITrackProps) {
    super(props);

    const {
      isDefault = false,
      kind = TRACK_KIND_SUBTITLES,
      srcLang = DEFAULT_LANG
    } = props;

    this.state = {
      isDefault,
      kind,
      srcLang
    };
  }

  public render() {
    return (
      <track
        default={this.props.isDefault}
        kind={this.props.kind}
        label={this.props.label}
        ref={this.trackRef}
        src={this.props.src}
        srcLang={this.props.srcLang}
      />
    );
  }

  public componentDidMount() {
    this.toggleNativeTextTrack(this.props.nativeControls);

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

  public componentDidUpdate(prevProps: ITrackProps) {
    const { nativeControls, subtitlesTracks } = prevProps;

    if (nativeControls) {
      this.toggleNativeTextTrack(this.props.nativeControls);
    }

    const prevActiveTrack = subtitlesTracks.find(isActiveTrack);
    const activeTrack = this.props.subtitlesTracks.find(isActiveTrack);

    // this track is active, but wasn't so at previous state.
    if (
      this.isActive() &&
      prevActiveTrack &&
      prevActiveTrack.label !== activeTrack!.label
    ) {
      const currentCue = this.trackRef.current!.track.activeCues[0];
      const currentText = currentCue ? currentCue.text : undefined;
      this.props.updateSubtitleText(currentText);
    }
  }

  private isActive() {
    const activeTrack = this.props.subtitlesTracks.find(isActiveTrack);

    if (!activeTrack) {
      return false;
    }

    return activeTrack.label === this.trackRef.current!.label;
  }

  private loadHandler = () => {
    const chaptersTrack = rawSubtitlesTrack(this.trackRef.current!.track);
    this.props.addSubtitlesTrack(chaptersTrack);
  };

  private cueChangeHandler = () => {
    if (!this.isActive()) {
      return;
    }

    const currentCue = this.trackRef.current!.track.activeCues[0];
    const currentText = currentCue ? currentCue.text : undefined;
    this.props.updateSubtitleText(currentText);
  };

  private toggleNativeTextTrack(nativeControls: boolean) {
    if (!nativeControls) {
      this.trackRef.current!.track.mode = TRACK_MODE_HIDDEN;
    }
  }
}

const mapStateToProps = (state: IAianaState) => ({
  nativeControls: state.player.nativeControls,
  subtitlesTracks: state.subtitles.subtitlesTracks
});

const mapDispatchToProps = {
  addSubtitlesTrack,
  updateSubtitleText: setSubtitlesText
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaSubtitlesTrack);
