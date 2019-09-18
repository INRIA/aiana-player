import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { changeMediaSource } from '../../actions/preferences';
import withUniqueId, { IInjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';
import { ISource, getSelectedMediaSource } from '../../reducers/player';
import { useTranslation } from 'react-i18next';

interface IStateProps {
  sources: ISource[];
}

interface IDispatchProps {
  changeMediaSource(src: string): void;
}

interface IProps extends IStateProps, IDispatchProps, IInjectedUniqueIdProps {}

function MediaSourceSelector(props: IProps) {
  const [t] = useTranslation();
  const selectedSource = getSelectedMediaSource(props.sources);

  return (
    <Fragment>
      <span id={props.uid}>{t('preferences.media_source.label')}</span>
      <select
        aria-labelledby={props.uid}
        value={selectedSource ? selectedSource.src : undefined}
        onBlur={(evt) => {
          props.changeMediaSource(evt.currentTarget.value);
        }}
        onChange={(evt) => {
          props.changeMediaSource(evt.currentTarget.value);
        }}
      >
        {props.sources.map((mediaSource) => (
          <option key={mediaSource.src} value={mediaSource.src}>
            {mediaSource.label}
          </option>
        ))}
      </select>
    </Fragment>
  );
}

function mapState(state: IAianaState) {
  return {
    sources: state.player.sources
  };
}

const mapDispatch = {
  changeMediaSource
};

export default connect(
  mapState,
  mapDispatch
)(withUniqueId(MediaSourceSelector));
