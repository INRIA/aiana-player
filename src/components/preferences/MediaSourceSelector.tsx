import React from 'react';
import { connect } from 'react-redux';
import { changeMediaSource } from '../../actions/preferences';
import withUniqueId, { IInjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';
import { ISource, getSelectedMediaSource } from '../../reducers/player';
import { useTranslation } from 'react-i18next';
import { CDispatch } from '../../store';

interface IStateProps {
  media: HTMLMediaElement;
  sources: ISource[];
}

interface IDispatchProps {
  changeHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface IProps extends IStateProps, IDispatchProps, IInjectedUniqueIdProps {}

function MediaSourceSelector(props: IProps) {
  const [t] = useTranslation();
  const selectedSource = getSelectedMediaSource(props.sources);

  return (
    <React.Fragment>
      <span id={props.uid}>{t('preferences.media_source.label')}</span>
      <select
        aria-labelledby={props.uid}
        onChange={props.changeHandler}
        value={selectedSource ? selectedSource.src : undefined}
      >
        {props.sources.map((mediaSource) => (
          <option key={mediaSource.src} value={mediaSource.src}>
            {mediaSource.label}
          </option>
        ))}
      </select>
    </React.Fragment>
  );
}

function mapState(state: IAianaState) {
  return {
    media: state.player.mediaElement,
    sources: state.player.sources
  };
}

function mapDispatch(dispatch: CDispatch) {
  return {
    changeHandler: (evt: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(changeMediaSource(evt.currentTarget.value));
    }
  };
}

export default connect(
  mapState,
  mapDispatch
)(withUniqueId(MediaSourceSelector));
