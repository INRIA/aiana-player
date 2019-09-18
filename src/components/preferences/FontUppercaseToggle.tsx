import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { toggleFontUppercase } from '../../actions/preferences';
import { IAianaState } from '../../reducers';
import ToggleButton from '../shared/ToggleButton';
import useId from '../../hooks/useId';

interface IStateProps {
  fontUppercase: boolean;
}

interface IDispatchProps {
  toggleFontUppercase(): void;
}

interface IProps extends IStateProps, IDispatchProps {}

function FontUppercaseToggle(props: IProps) {
  const [t] = useTranslation();
  const [id] = useId();

  return (
    <Fragment>
      <span id={id}>{t('preferences.font_uppercase.label')}</span>
      <ToggleButton
        isOn={props.fontUppercase}
        labelledBy={id}
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
)(FontUppercaseToggle);
