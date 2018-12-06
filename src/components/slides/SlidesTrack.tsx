import * as React from 'react';
import { connect } from 'react-redux';
import { addSlidesTrack, setSlidesText } from '../../actions/slides';
import { TRACK_KIND_METADATA, TRACK_MODE_HIDDEN } from '../../constants';
import { IAianaState } from '../../reducers';
import {
  getLastActiveCueText,
  IRawSlidesTrack,
  rawSlidesTrack
} from '../../utils/media';

interface IProps {
  label?: string;
  src?: string;
  srcLang?: string;
}

interface IStateProps {
  language: string;
  slidesTracks: IRawSlidesTrack[];
}

interface IDispatchProps {
  addSlidesTrack(track: IRawSlidesTrack): void;
  setSlidesText(text?: string): void;
}

interface ISlideTrackProps extends IProps, IStateProps, IDispatchProps {}

class SlidesTrack extends React.Component<ISlideTrackProps> {
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

  public componentDidUpdate(prevProps: ISlideTrackProps) {
    const prevActiveTrack = prevProps.slidesTracks.find((track) => {
      return track.language === prevProps.language;
    });
    const activeTrack = this.props.slidesTracks.find((track) => {
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
      this.props.setSlidesText(currentText);
    }
  }

  private loadHandler = () => {
    const slidesTrack: IRawSlidesTrack = rawSlidesTrack(
      this.trackRef.current!.track
    );
    this.props.addSlidesTrack(slidesTrack);
  };

  private cueChangeHandler = () => {
    if (this.props.srcLang === this.props.language) {
      const track = this.trackRef.current!.track;
      const currentText = getLastActiveCueText(track);
      this.props.setSlidesText(currentText);
    }
  };
}

const mapStateToProps = (state: IAianaState) => ({
  language: state.slides.language,
  slidesTracks: state.slides.slidesTracks
});

const mapDispatchToProps = {
  addSlidesTrack,
  setSlidesText
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SlidesTrack);
