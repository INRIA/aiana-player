import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setChaptersMenu } from '../../actions/chapters';
import withUniqueId, { InjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';
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
    InjectedUniqueIdProps,
    WithTranslation {}

class ChaptersMenuToggle extends React.Component<IChaptersMenuToggle> {
  render() {
    return (
      <React.Fragment>
        <span id={this.props.uid}>
          {this.props.t('preferences.show_chapters.label')}
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
)(withTranslation()(withUniqueId(ChaptersMenuToggle)));
