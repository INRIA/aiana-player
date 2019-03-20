import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setWindowsLock } from '../../../actions/preferences';
import { DEFAULT_WINDOWS_LOCK } from '../../../constants';
import withUniqueId, {
  InjectedUniqueIdProps
} from '../../../hocs/withUniqueId';
import ToggleButton from '../../shared/toggle-button';

interface IDispatchProps {
  setWindowsLock(locked: boolean): any;
}

interface IWindowsLockToggle
  extends IDispatchProps,
    InjectedUniqueIdProps,
    WithTranslation {}

interface IState {
  locked: boolean;
}

const defaultState: IState = {
  locked: DEFAULT_WINDOWS_LOCK
};

class WindowsLockToggle extends React.Component<IWindowsLockToggle, IState> {
  readonly state = defaultState;

  render() {
    return (
      <React.Fragment>
        <span id={this.props.uid}>
          {this.props.t('preferences.windows_locked.label')}
        </span>
        <ToggleButton
          isOn={this.state.locked}
          labelledBy={this.props.uid}
          onClick={this.clickHandler}
        />
      </React.Fragment>
    );
  }

  private clickHandler = () => {
    this.setState(
      {
        locked: !this.state.locked
      },
      () => {
        this.props.setWindowsLock(this.state.locked);
      }
    );
  };
}

const mapDispatchToProps = {
  setWindowsLock
};

export default connect(
  null,
  mapDispatchToProps
)(withTranslation()(withUniqueId(WindowsLockToggle)));
