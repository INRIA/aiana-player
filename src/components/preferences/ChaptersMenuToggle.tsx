import * as React from 'react';
import { I18nContextValues, withI18n } from 'react-i18next';
import { connect } from 'react-redux';
import { setChaptersMenu } from '../../actions/chapters';
import { IAianaState } from '../../reducers';
import withUniqueId, { InjectedUniqueIdProps } from '../hocs/withUniqueId';
import ToggleButton from '../shared/toggle-button/ToggleButton';

interface IStateProps {
  menuEnabled: boolean;
}

interface IDispatchProps {
  setChaptersMenu(enabled: boolean): any;
}

interface IChaptersMenuToggle
  extends IStateProps,
    IDispatchProps,
    I18nContextValues,
    InjectedUniqueIdProps {}

class ChaptersMenuToggle extends React.Component<IChaptersMenuToggle> {
  public render() {
    return (
      <React.Fragment>
        <span id={this.props.uid}>
          {this.props.t('preferences.menu_enabled.label')}
        </span>
        <ToggleButton
          isOn={this.props.menuEnabled}
          labelledBy={this.props.uid}
          onClick={this.clickHandler}
        />
      </React.Fragment>
    );
  }

  private clickHandler = () => {
    this.props.setChaptersMenu(!this.props.menuEnabled);
  };
}

function mapStateToProps(state: IAianaState) {
  return {
    menuEnabled: state.chapters.menuEnabled
  };
}

const mapDispatchToProps = {
  setChaptersMenu
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withI18n()(withUniqueId(ChaptersMenuToggle)));
