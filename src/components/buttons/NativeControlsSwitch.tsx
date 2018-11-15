import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { toggleNativeControls } from 'src/actions/player';
import { IAianaState } from 'src/reducers/index';
import { uuid } from 'src/utils/ui';
import ToggleButton from '../shared/toggle-button/ToggleButton';

interface IStateProps {
  nativeControls: boolean;
}

interface IDispatchProps {
  toggleNativeControls(nativeControls: boolean): AnyAction;
}

interface INativeControlsSwitch
  extends IStateProps,
    IDispatchProps,
    InjectedTranslateProps {}

class NativeControlsSwitch extends React.Component<INativeControlsSwitch> {
  public render() {
    const { nativeControls, t } = this.props;
    const id = `aip-native-controls-${uuid()}`;

    return (
      <React.Fragment>
        <span id={id}>{t('preferences.native_controls')}</span>
        <ToggleButton
          labelledBy={id}
          onClick={this.clickHandler}
          isOn={nativeControls}
        />
      </React.Fragment>
    );
  }

  private clickHandler = (evt: React.MouseEvent<any>) => {
    evt.preventDefault();
    this.props.toggleNativeControls(!this.props.nativeControls);
  };
}

const mapStateToProps = (state: IAianaState) => ({
  nativeControls: state.player.nativeControls
});

const mapDispatchToProps = {
  toggleNativeControls
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(NativeControlsSwitch));
