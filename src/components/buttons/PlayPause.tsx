import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import Pause from '../svg/Pause';
import Play from '../svg/PlayArrow';

interface IProps {
  isPlaying?: boolean;
}

class PlayPauseButton extends React.Component<IProps & InjectedIntlProps> {
  public static defaultProps: IProps = {
    isPlaying: false
  };

  public render() {
    const { intl, isPlaying } = this.props;
    let controlText;
    let controlBtn;

    if (isPlaying) {
      controlText = intl.formatMessage({
        defaultMessage: 'Pause',
        id: 'controls.pause'
      });
      controlBtn = <Pause />;
    } else {
      controlText = intl.formatMessage({
        defaultMessage: 'Play',
        id: 'controls.play'
      });
      controlBtn = <Play />;
    }

    return (
      <button
        type="button"
        aria-label={controlText}
        className="aiana-control-btn"
        onClick={this.togglePlay}
      >
        {controlBtn}
        <span className="aiana-control-text">{controlText}</span>
      </button>
    );
  }

  private togglePlay = () => {
    //
  };
}

export default injectIntl(PlayPauseButton);
