import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateLineHeight } from '../../actions/preferences';
import { IAianaState } from '../../reducers';
import { CDispatch } from '../../store';
import useId from '../../hooks/useId';

interface IStateProps {
  lineHeight?: number;
  lineHeightValues?: number[];
}

interface IDispatchProps {
  changeHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface IProps extends IStateProps, IDispatchProps {}

function LineHeightSelector(props: IProps) {
  const [t] = useTranslation();
  const [id] = useId();

  return (
    <Fragment>
      <span id={id}>{t('preferences.line_height.label')}</span>
      <select
        aria-labelledby={id}
        onBlur={props.changeHandler}
        onChange={props.changeHandler}
        value={props.lineHeight}
      >
        {props.lineHeightValues &&
          props.lineHeightValues.map((lineHeight) => (
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

function mapDispatch(dispatch: CDispatch) {
  return {
    changeHandler: (evt: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(updateLineHeight(Number(evt.currentTarget.value)));
    }
  };
}

export default connect(
  mapState,
  mapDispatch
)(LineHeightSelector);
