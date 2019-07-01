import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setTextHighlighting } from '../../actions/preferences';
import withUniqueId, { IInjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';
import ToggleButton from '../shared/toggle-button';

interface IStateProps {
  textHighlighting: boolean;
}

interface IDispatchProps {
  setTextHighlighting(textHighlighting: boolean): void;
}

interface IProps extends IStateProps, IDispatchProps, IInjectedUniqueIdProps {}

function TextHighlightingToggle(props: IProps) {
  const [t] = useTranslation();

  return (
    <Fragment>
      <span id={props.uid}>{t('preferences.text_highlighting.label')}</span>
      <ToggleButton
        isOn={props.textHighlighting}
        labelledBy={props.uid}
        onClick={() => props.setTextHighlighting(!props.textHighlighting)}
      />
    </Fragment>
  );
}

function mapState(state: IAianaState) {
  return {
    textHighlighting: state.preferences.textHighlighting
  };
}

const mapDispatch: IDispatchProps = {
  setTextHighlighting
};

export default connect(
  mapState,
  mapDispatch
)(withUniqueId(TextHighlightingToggle));
