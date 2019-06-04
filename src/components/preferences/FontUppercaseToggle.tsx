import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setFontUppercase } from '../../actions/preferences';
import withUniqueId, { IInjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';
import ToggleButton from '../shared/toggle-button';

interface IStateProps {
  fontUppercase: boolean;
}

interface IDispatchProps {
  setFontUppercase(fontUppercase: boolean): void;
}

interface IProps
  extends IStateProps,
    IDispatchProps,
    WithTranslation,
    IInjectedUniqueIdProps {}

class FontUppercaseToggle extends Component<IProps> {
  render() {
    return (
      <React.Fragment>
        <span id={this.props.uid}>
          {this.props.t('preferences.font_uppercase.label')}
        </span>
        <ToggleButton
          isOn={this.props.fontUppercase}
          labelledBy={this.props.uid}
          onClick={this.clickHandler}
        />
      </React.Fragment>
    );
  }

  clickHandler = () => {
    this.props.setFontUppercase(!this.props.fontUppercase);
  };
}

function mapState(state: IAianaState) {
  return {
    fontUppercase: state.preferences.fontUppercase
  };
}

const mapDispatch: IDispatchProps = {
  setFontUppercase
};

export default connect(
  mapState,
  mapDispatch
)(withTranslation()(withUniqueId(FontUppercaseToggle)));
