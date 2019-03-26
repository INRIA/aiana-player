import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateActiveFontSizeMultiplier } from '../../actions/preferences';
import withUniqueId, { InjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';
import { CDispatch } from '../../store';

interface IStateProps {
  activeMultiplier: number;
  multipliers: number[];
}

interface IDispatchProps {
  changeHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface IProps extends IStateProps, IDispatchProps, InjectedUniqueIdProps {}

function FontSizeSelector(props: IProps) {
  const [t] = useTranslation();

  return (
    <React.Fragment>
      <span id={props.uid}>{t('preferences.font_size_multiplier.label')}</span>
      <select
        aria-labelledby={props.uid}
        onChange={props.changeHandler}
        value={props.activeMultiplier}
      >
        {props.multipliers.map((multiplier) => (
          <option key={multiplier} value={multiplier}>
            ×{multiplier}
          </option>
        ))}
      </select>
    </React.Fragment>
  );
}

function mapStateToProps(state: IAianaState) {
  return {
    activeMultiplier: state.preferences.activeFontSizeMultiplier,
    multipliers: state.preferences.fontSizeMultipliers
  };
}

function mapDispatchToProps(dispatch: CDispatch) {
  return {
    changeHandler: (evt: React.ChangeEvent<HTMLSelectElement>) => {
      const multiplier = Number.parseFloat(evt.currentTarget.value);
      dispatch(updateActiveFontSizeMultiplier(multiplier));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withUniqueId(FontSizeSelector));
