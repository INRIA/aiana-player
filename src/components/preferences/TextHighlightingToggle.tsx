import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setTextHighlighting } from '../../actions/preferences';
import withUniqueId, { IInjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';
import ToggleButton from '../shared/toggle-button';

interface IStateProps {
  textHighlighting: boolean;
}

interface IDispatchProps {
  dispatchSetTextHighlighting(textHighlighting: boolean): void;
}

interface IProps
  extends IStateProps,
    IDispatchProps,
    WithTranslation,
    IInjectedUniqueIdProps {}

class TextHighlightingToggle extends Component<IProps> {
  render() {
    return (
      <React.Fragment>
        <span id={this.props.uid}>
          {this.props.t('preferences.text_highlighting.label')}
        </span>
        <ToggleButton
          isOn={this.props.textHighlighting}
          labelledBy={this.props.uid}
          onClick={this.clickHandler}
        />
      </React.Fragment>
    );
  }

  clickHandler = () => {
    this.props.dispatchSetTextHighlighting(!this.props.textHighlighting);
  };
}

function mapState(state: IAianaState) {
  return {
    textHighlighting: state.preferences.textHighlighting
  };
}

const mapDispatch: IDispatchProps = {
  dispatchSetTextHighlighting: setTextHighlighting
};

export default connect(
  mapState,
  mapDispatch
)(withTranslation()(withUniqueId(TextHighlightingToggle)));
