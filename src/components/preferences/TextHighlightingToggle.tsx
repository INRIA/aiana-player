import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { toggleTextHighlighting } from '../../actions/preferences';
import { IAianaState } from '../../reducers';
import ToggleButton from '../shared/ToggleButton';
import useId from '../../hooks/useId';

interface IStateProps {
  textHighlighting: boolean;
}

interface IDispatchProps {
  toggleTextHighlighting(): void;
}

interface IProps extends IStateProps, IDispatchProps {}

function TextHighlightingToggle(props: IProps) {
  const [t] = useTranslation();
  const [id] = useId();

  return (
    <Fragment>
      <span id={id}>{t('preferences.text_highlighting.label')}</span>
      <ToggleButton
        isOn={props.textHighlighting}
        labelledBy={id}
        onClick={() => props.toggleTextHighlighting()}
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
  toggleTextHighlighting
};

export default connect(
  mapState,
  mapDispatch
)(TextHighlightingToggle);
