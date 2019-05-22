import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeMediaSource } from '../../actions/preferences';
import withUniqueId, { IInjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';
import { ISource } from '../../reducers/player';
import { isSelectedSource } from '../video/VideoPlayer';
import { withTranslation, WithTranslation } from 'react-i18next';

interface IStateProps {
  media: HTMLMediaElement;
  mediaSources: ISource[];
}

interface IDispatchProps {
  dispatchUpdateMediaSource(mediaSource: string): void;
}

interface IProps
  extends IStateProps,
    IDispatchProps,
    WithTranslation,
    IInjectedUniqueIdProps {}

class MediaSourceSelector extends Component<IProps> {
  render() {
    const selectedSource = this.props.mediaSources.find(isSelectedSource);

    return (
      <React.Fragment>
        <span id={this.props.uid}>
          {this.props.t('preferences.media_source.label')}
        </span>
        <select
          aria-labelledby={this.props.uid}
          onChange={this.changeHandler}
          value={selectedSource ? selectedSource.src : undefined}
        >
          {this.props.mediaSources.map((mediaSource) => (
            <option key={mediaSource.src} value={mediaSource.src}>
              {mediaSource.label}
            </option>
          ))}
        </select>
      </React.Fragment>
    );
  }

  changeHandler = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.dispatchUpdateMediaSource(evt.currentTarget.value);
  };
}

function mapState(state: IAianaState) {
  return {
    media: state.player.mediaElement,
    mediaSources: state.player.sources
  };
}

const mapDispatch: IDispatchProps = {
  dispatchUpdateMediaSource: changeMediaSource
};

export default connect(
  mapState,
  mapDispatch
)(withTranslation()(withUniqueId(MediaSourceSelector)));
