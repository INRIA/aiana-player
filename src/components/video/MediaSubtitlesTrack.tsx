import React from 'react';
import { connect } from 'react-redux';
import { addSubtitlesTrack, setSubtitlesText } from '../../actions/subtitles';
import {
  TRACK_KIND_SUBTITLES,
  TRACK_MODE_HIDDEN
} from '../../constants/tracks';
import { IAianaState } from '../../reducers';
import {
  IRawSubtitlesTrack,
  getLastActiveCueText,
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
  subtitlesLanguage?: string;
  subtitlesTracks: IRawSubtitlesTrack[];
}

interface IDispatchProps {
  addSubtitlesTrack(track: IRawSubtitlesTrack): void;
  setSubtitlesText(text?: string): void;
}

interface ITrackProps extends ITrack, IStateProps, IDispatchProps {}

class MediaSubtitlesTrack extends React.Component<ITrackProps> {
  static defaultProps: ITrack = {
    isDefault: false,
    kind: TRACK_KIND_SUBTITLES
  };

  trackRef = React.createRef<HTMLTrackElement>();

  render() {
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

  componentDidMount() {
    // TODO: is it really hidden?
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

  componentDidUpdate(prevProps: ITrackProps) {
    const prevActiveTrack = prevProps.subtitlesTracks.find(isActiveTrack);
    const activeTrack = this.props.subtitlesTracks.find(isActiveTrack);

    // this track is active, but wasn't so at previous state.
    if (prevActiveTrack && prevActiveTrack.label !== activeTrack!.label) {
      this.cueChangeHandler();
    }
  }

  isActive() {
    const activeTrack = this.props.subtitlesTracks.find(isActiveTrack);

    if (!activeTrack) {
      return false;
    }

    return activeTrack.label === this.trackRef.current!.label;
  }

  loadHandler = () => {
    const chaptersTrack = rawSubtitlesTrack(
      this.trackRef.current!.track,
      this.props.subtitlesLanguage
    );
    this.props.addSubtitlesTrack(chaptersTrack);
  };

  cueChangeHandler = () => {
    if (!this.isActive()) {
      return;
    }

    const currentText = getLastActiveCueText(this.trackRef.current!.track);
    this.props.setSubtitlesText(currentText);
  };
}

function mapState(state: IAianaState) {
  return {
    subtitlesLanguage: state.subtitles.language,
    subtitlesTracks: state.subtitles.subtitlesTracks
  };
}

const mapDispatch = {
  addSubtitlesTrack,
  setSubtitlesText
};

export default connect(
  mapState,
  mapDispatch
)(MediaSubtitlesTrack);
