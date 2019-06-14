import React from 'react';
import { useTranslation } from 'react-i18next';
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

interface IProps extends IStateProps, IDispatchProps, IInjectedUniqueIdProps {}

function FontUppercaseToggle(props: IProps) {
  const [t] = useTranslation();

  return (
    <React.Fragment>
      <span id={props.uid}>{t('preferences.font_uppercase.label')}</span>
      <ToggleButton
        isOn={props.fontUppercase}
        labelledBy={props.uid}
        onClick={() => props.setFontUppercase(!props.fontUppercase)}
      />
    </React.Fragment>
  );
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
)(withUniqueId(FontUppercaseToggle));
