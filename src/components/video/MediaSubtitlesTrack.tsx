import * as React from 'react';
import { connect } from 'react-redux';
import { addSubtitlesTrack, setSubtitlesText } from '../../actions/subtitles';
import { TRACK_KIND_SUBTITLES, TRACK_MODE_HIDDEN } from '../../constants';
import { IAianaState } from '../../reducers/index';
import {
  getLastActiveCueText,
  IRawSubtitlesTrack,
  isActiveTrack,
  rawSubtitlesTrack
} from '../../utils/media';

export interface ITrack {
  isDefault?: boolean;
  kind?: TextTrackKind;
  label?: string;
  src?: string;
  srcLang?: string;
}

interface IStateProps {
  subtitlesTracks: IRawSubtitlesTrack[];
}

interface IDispatchProps {
  addSubtitlesTrack(track: IRawSubtitlesTrack): void;
  updateSubtitleText(text?: string): void;
}

interface ITrackProps extends ITrack, IStateProps, IDispatchProps {}

class MediaSubtitlesTrack extends React.Component<ITrackProps> {
  public static defaultProps: ITrack = {
    isDefault: false,
    kind: TRACK_KIND_SUBTITLES
  };

  private trackRef = React.createRef<HTMLTrackElement>();

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

  public componentDidUpdate(prevProps: ITrackProps) {
    const prevActiveTrack = prevProps.subtitlesTracks.find(isActiveTrack);
    const activeTrack = this.props.subtitlesTracks.find(isActiveTrack);

    // this track is active, but wasn't so at previous state.
    if (
      this.isActive() &&
      prevActiveTrack &&
      prevActiveTrack.label !== activeTrack!.label
    ) {
      const track = this.trackRef.current!.track;
      const currentText = getLastActiveCueText(track);
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

    const track = this.trackRef.current!.track;
    const currentText = getLastActiveCueText(track);
    this.props.updateSubtitleText(currentText);
  };
}

const mapStateToProps = (state: IAianaState) => ({
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
