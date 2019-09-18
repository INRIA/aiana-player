import React, { Fragment, useContext } from 'react';
import { connect } from 'react-redux';
import { changePlaybackRate } from '../../actions/player';
import { IAianaState } from '../../reducers';
import { useTranslation } from 'react-i18next';
import MediaContext from '../../contexts/MediaContext';
import useId from '../../hooks/useId';

interface IStateProps {
  currentPlaybackRate?: number;
  playbackRates?: number[];
}

interface IDispatchProps {
  changePlaybackRate(playbackRate: number): void;
}

interface IPlaybackRateSelector extends IStateProps, IDispatchProps {}

function PlaybackRateSelector(props: IPlaybackRateSelector) {
  const [t] = useTranslation();
  const [id] = useId();
  const [media] = useContext(MediaContext);

  const { playbackRates, currentPlaybackRate } = props;

  const changeHandler = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const playbackRate = Number(evt.currentTarget.value);

    media.playbackRate = playbackRate;
    props.changePlaybackRate(playbackRate);
  };

  return (
    <Fragment>
      <span id={id}>{t('preferences.playbackrate.label')}</span>
      <select
        aria-labelledby={id}
        value={currentPlaybackRate}
        onBlur={changeHandler}
        onChange={changeHandler}
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
)(PlaybackRateSelector);
