import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store/index';

export interface ITrack {
  isDefault?: boolean;
  kind?: TextTrackKind;
  label?: string | undefined;
  src?: string | undefined;
  srcLang?: string | undefined;
}

interface IState {
  isActive: boolean;
}

export interface IConnectedTrack extends ITrack, IConnectedReduxProps {
  nativeControls: boolean;
}

// TODO: there should be a way to "resume" text tracks `mode`. May be maintaining each one in player state?

class VideoTrack extends React.Component<IConnectedTrack, IState> {
  public static defaultProps: ITrack = {
    isDefault: false,
    kind: 'subtitles'
  };

  public state = {
    isActive: false
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
    this.toggleNativeTextTrack(this.props.nativeControls);
  }

  public componentDidUpdate(prevProps: IConnectedTrack) {
    const { nativeControls: prevNativeControls } = prevProps;

    if (prevNativeControls) {
      this.toggleNativeTextTrack(this.props.nativeControls);
    }
  }

  private toggleNativeTextTrack(nativeControls: boolean) {
    if (!nativeControls && this.trackRef.current) {
      this.trackRef.current.track.mode = TextTrack.SHOWING;
    }
  }
}

export default connect((state: IAianaState) => ({
  nativeControls: state.player.nativeControls
}))(VideoTrack);
