import React, { Fragment, useContext } from 'react';
import { connect } from 'react-redux';
import { changePlaybackRate } from '../../actions/player';
import withUniqueId, { IInjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';
import { useTranslation } from 'react-i18next';
import MediaContext from '../../contexts/MediaContext';

interface IStateProps {
  currentPlaybackRate?: number;
  playbackRates?: number[];
}

interface IDispatchProps {
  changePlaybackRate(playbackRate: number): void;
}

interface IPlaybackRateSelector
  extends IInjectedUniqueIdProps,
    IStateProps,
    IDispatchProps {}

function PlaybackRateSelector(props: IPlaybackRateSelector) {
  const [t] = useTranslation();
  const [media] = useContext(MediaContext);

  const { playbackRates, currentPlaybackRate, uid } = props;

  return (
    <Fragment>
      <span id={uid}>{t('preferences.playbackrate.label')}</span>
      <select
        aria-labelledby={uid}
        value={currentPlaybackRate}
        onBlur={(evt: React.ChangeEvent<HTMLSelectElement>) => {
          const playbackRate = Number(evt.currentTarget.value);

          media.playbackRate = playbackRate;
          props.changePlaybackRate(playbackRate);
        }}
      >
        {playbackRates &&
          playbackRates.map((playbackRate) => (
            <option key={playbackRate} value={playbackRate}>
              ×{playbackRate}
            </option>
          ))}
      </select>
    </Fragment>
  );
}

function mapState(state: IAianaState) {
  return {
    currentPlaybackRate: state.player.playbackRate,
    playbackRates: state.preferences.playbackRates
  };
}

const mapDispatch = {
  changePlaybackRate
};

export default connect(
  mapState,
  mapDispatch
)(withUniqueId(PlaybackRateSelector));
