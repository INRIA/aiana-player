import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateLineHeight } from '../../actions/preferences';
import { IAianaState } from '../../reducers';
import useId from '../../hooks/useId';

interface IStateProps {
  lineHeight: number;
  lineHeightValues: number[];
}

interface IDispatchProps {
  updateLineHeight(height: number): void;
}

interface IProps extends IStateProps, IDispatchProps {}

function LineHeightSelector(props: IProps) {
  const [t] = useTranslation();
  const [id] = useId();

  const changeHandler = (evt: React.SyntheticEvent<HTMLSelectElement>) => {
    const lineHeight = Number(evt.currentTarget.value);
    if (lineHeight !== props.lineHeight) {
      props.updateLineHeight(lineHeight);
    }
  };

  return (
    <Fragment>
      <span id={id}>{t('preferences.line_height.label')}</span>
      <select
        aria-labelledby={id}
        onBlur={changeHandler}
        onChange={changeHandler}
        value={props.lineHeight}
      >
        {props.lineHeightValues.map((lineHeight) => (
          <option key={lineHeight} value={lineHeight}>
            {lineHeight}
          </option>
        ))}
      </select>
    </Fragment>
  );
}

function mapState(state: IAianaState) {
  return {
    lineHeight: state.preferences.lineHeight,
    lineHeightValues: state.preferences.lineHeightValues
  };
}

const mapDispatch = {
  updateLineHeight
};

export default connect(
  mapState,
  mapDispatch
)(LineHeightSelector);
