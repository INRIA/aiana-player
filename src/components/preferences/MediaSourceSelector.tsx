import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { changeMediaSource } from '../../actions/preferences';
import { IAianaState } from '../../reducers';
import { ISource, getSelectedMediaSource } from '../../reducers/player';
import { useTranslation } from 'react-i18next';
import useId from '../../hooks/useId';

interface IStateProps {
  sources: ISource[];
}

interface IDispatchProps {
  changeMediaSource(src: string): void;
}

interface IProps extends IStateProps, IDispatchProps {}

function MediaSourceSelector(props: IProps) {
  const [t] = useTranslation();
  const [id] = useId();

  const selectedSource = getSelectedMediaSource(props.sources);

  const changeHandler = (evt: React.SyntheticEvent<HTMLSelectElement>) => {
    if (!selectedSource || evt.currentTarget.value !== selectedSource.src) {
      props.changeMediaSource(evt.currentTarget.value);
    }
  };

  return (
    <Fragment>
      <span id={id}>{t('preferences.media_source.label')}</span>
      <select
        aria-labelledby={id}
        value={selectedSource ? selectedSource.src : undefined}
        onBlur={changeHandler}
        onChange={changeHandler}
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
)(MediaSourceSelector);
