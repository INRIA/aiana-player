import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setFontModifierUppercase } from '../../actions/preferences';
import withUniqueId, { InjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';
import ToggleButton from '../shared/toggle-button';

interface IStateProps {
  textUppercase: boolean;
}

interface IDispatchProps {
  setFontModifierUppercase(textUppercase: boolean): void;
}

interface IProps
  extends IStateProps,
    IDispatchProps,
    WithTranslation,
    InjectedUniqueIdProps {}

class FontModifierUppercaseToggle extends Component<IProps> {
  render() {
    return (
      <React.Fragment>
        <span id={this.props.uid}>
          {this.props.t('preferences.text_uppercase.label')}
        </span>
        <ToggleButton
          isOn={this.props.textUppercase}
          labelledBy={this.props.uid}
          onClick={this.clickHandler}
        />
      </React.Fragment>
    );
  }

  clickHandler = () => {
    this.props.setFontModifierUppercase(!this.props.textUppercase);
  };
}

function mapState(state: IAianaState) {
  return {
    textUppercase: state.preferences.fontModifierUppercase
  };
}

const mapDispatch: IDispatchProps = {
  setFontModifierUppercase: setFontModifierUppercase
};

export default connect(
  mapState,
  mapDispatch
)(withTranslation()(withUniqueId(FontModifierUppercaseToggle)));
