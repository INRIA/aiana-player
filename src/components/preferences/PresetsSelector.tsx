import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { changeActivePreset } from '../../actions/presets';
import { IPreset, getActivePreset } from '../../reducers/presets';
import { CDispatch } from '../../store';
import useId from '../../hooks/useId';

interface IProps {
  // TODO: can presets be null?
  presets: IPreset[];
}

interface IDispatchProps {
  selectChangeHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface IPresetsSelector extends IProps, IDispatchProps {}

function PresetsSelector({ presets, selectChangeHandler }: IPresetsSelector) {
  const [t] = useTranslation();
  const [id] = useId();

  const activePreset = getActivePreset(presets);
  const activePresetName = activePreset ? activePreset.name : '';

  return (
    <Fragment>
      <span id={id}>{t('preferences.presets_selector.label')}</span>
      <select
        aria-labelledby={id}
        onBlur={selectChangeHandler}
        onChange={selectChangeHandler}
        value={activePresetName}
      >
        <option key="empty_preset" value="" disabled>
          {/* TODO: use an explicit option text */}
          ---
        </option>
        {presets.map((preset) => (
          <option key={preset.name} value={preset.name}>
            {preset.name}
          </option>
        ))}
      </select>
    </Fragment>
  );
}

function mapDispatch(dispatch: CDispatch, ownProps: IProps) {
  return {
    selectChangeHandler: (evt: React.ChangeEvent<HTMLSelectElement>) => {
      const presetName = evt.currentTarget.value;
      const activePreset = ownProps.presets.find((v) => v.name === presetName);

      dispatch(changeActivePreset(activePreset));
    }
  };
}

export default connect(
  null,
  mapDispatch
)(PresetsSelector);
