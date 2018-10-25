import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { toggleNativeControls } from 'src/actions/player';
import { IAianaState } from 'src/reducers/index';

interface IProps {
  nativeControls: boolean;
}

interface IDispatchProps {
  toggleNativeControls(nativeControls: boolean): AnyAction;
}

interface INativeControlsSwitch
  extends IProps,
    IDispatchProps,
    InjectedTranslateProps {}

class NativeControlsSwitch extends React.Component<INativeControlsSwitch> {
  public render() {
    const { nativeControls, t } = this.props;

    return (
      <label>
        <span>{t('preferences.native_controls')}</span>
        <input
          type="checkbox"
          defaultChecked={nativeControls}
          onClick={this.clickHandler}
        />
      </label>
    );
  }

  private clickHandler = () => {
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
