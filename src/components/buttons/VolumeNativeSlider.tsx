import * as React from 'react';
import { connect } from 'react-redux';
import { requestChangeVolume } from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store/index';

interface IProps {
  videoElement: HTMLVideoElement;
  volume: number;
}

class VolumeNativeSlider extends React.Component<
  IProps & IConnectedReduxProps
> {
  private volumeInput = React.createRef<HTMLInputElement>();

  public render() {
    const { volume } = this.props;

    return (
      <input
        ref={this.volumeInput}
        type="range"
        step={1}
        min={0}
        max={100}
        onChange={this.handleChangeVolume}
        value={this.volumeToPercents(volume)}
      />
    );
  }

  private handleChangeVolume = () => {
    const { dispatch, videoElement } = this.props;
    const newVolume = Number(this.volumeInput.current!.value) / 100;

    dispatch(requestChangeVolume(videoElement, newVolume));
  };

  private volumeToPercents = (volume: number) => {
    return volume * 100;
  };
}

export default connect((state: IAianaState) => ({
  videoElement: state.player.videoElement,
  volume: state.player.volume
}))(VolumeNativeSlider);
