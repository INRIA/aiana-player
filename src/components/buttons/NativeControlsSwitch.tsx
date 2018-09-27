import * as React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toggleNativeControls } from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import { ITransnected } from '../../utils/types';

interface IProps extends ITransnected {
  nativeControls: boolean;
}

class NativeControlsSwitch extends React.Component<IProps> {
  public render() {
    const { nativeControls, t } = this.props;

    return (
      <label>
        <span>{t('preferences.native_controls')}</span>
        <input
          type="checkbox"
          defaultChecked={nativeControls}
          onClick={this.handleInputCheck}
        />
      </label>
    );
  }

  private handleInputCheck = () => {
    const { dispatch, nativeControls } = this.props;

    dispatch(toggleNativeControls(!nativeControls));
  };
}

export default connect((state: IAianaState) => ({
  nativeControls: state.player.nativeControls
}))(translate()(NativeControlsSwitch));
