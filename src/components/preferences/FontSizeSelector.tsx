import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateFontSizeMultiplier } from '../../actions/preferences';
import { IAianaState } from '../../reducers';
import useId from '../../hooks/useId';

interface IStateProps {
  activeMultiplier: number;
  availableMultipliers: number[];
}

interface IDispatchProps {
  updateFontSizeMultiplier(multiplier: any): void;
}

interface IProps extends IStateProps, IDispatchProps {}

function FontSizeSelector(props: IProps) {
  const [t] = useTranslation();
  const [id] = useId();

  const changeHandler = (evt: React.SyntheticEvent<HTMLSelectElement>) => {
    const multiplier = Number.parseFloat(evt.currentTarget.value);

    if (multiplier !== props.activeMultiplier) {
      props.updateFontSizeMultiplier(multiplier);
    }
  };

  return (
    <Fragment>
      <span id={id}>{t('preferences.font_size_multiplier.label')}</span>
      <select
        aria-labelledby={id}
        onBlur={changeHandler}
        onChange={changeHandler}
        value={props.activeMultiplier}
      >
        {props.availableMultipliers.map((multiplier) => (
          <option key={multiplier} value={multiplier}>
            ×{multiplier}
          </option>
        ))}
      </select>
    </Fragment>
  );
}

function mapState(state: IAianaState) {
  return {
    activeMultiplier: state.preferences.fontSizeMultiplier,
    availableMultipliers: state.preferences.fontSizeMultipliers
  };
}

const mapDispatch = {
  updateFontSizeMultiplier
};

export default connect(
  mapState,
  mapDispatch
)(FontSizeSelector);
