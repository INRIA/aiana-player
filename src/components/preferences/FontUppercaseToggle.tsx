import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { toggleFontUppercase } from '../../actions/preferences';
import withUniqueId, { IInjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';
import ToggleButton from '../shared/toggle-button';

interface IStateProps {
  fontUppercase: boolean;
}

interface IDispatchProps {
  toggleFontUppercase(): void;
}

interface IProps extends IStateProps, IDispatchProps, IInjectedUniqueIdProps {}

function FontUppercaseToggle(props: IProps) {
  const [t] = useTranslation();

  return (
    <Fragment>
      <span id={props.uid}>{t('preferences.font_uppercase.label')}</span>
      <ToggleButton
        isOn={props.fontUppercase}
        labelledBy={props.uid}
        onClick={() => props.toggleFontUppercase()}
      />
    </Fragment>
  );
}

function mapState(state: IAianaState) {
  return {
    fontUppercase: state.preferences.fontUppercase
  };
}

const mapDispatch: IDispatchProps = {
  toggleFontUppercase
};

export default connect(
  mapState,
  mapDispatch
)(withUniqueId(FontUppercaseToggle));
