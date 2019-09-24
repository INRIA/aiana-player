import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { changeActivePreset } from '../../actions/presets';
import { IPreset, getActivePreset } from '../../reducers/presets';
import useId from '../../hooks/useId';

interface IProps {
  // TODO: can presets be null?
  presets: IPreset[];
}

interface IDispatchProps {
  changeActivePreset(preset: IPreset): void;
}

interface IPresetsSelector extends IProps, IDispatchProps {}

function PresetsSelector(props: IPresetsSelector) {
  const [t] = useTranslation();
  const [id] = useId();

  const activePreset = getActivePreset(props.presets);
  const activePresetName = activePreset ? activePreset.name : '';

  const changeHandler = (evt: React.SyntheticEvent<HTMLSelectElement>) => {
    const presetName = evt.currentTarget.value;

    if (presetName !== activePresetName) {
      const preset = props.presets.find((v) => v.name === presetName);
      if (preset) {
        props.changeActivePreset(preset);
      }
    }
  };

  return (
    <Fragment>
      <span id={id}>{t('preferences.presets_selector.label')}</span>
      <select
        aria-labelledby={id}
        onBlur={changeHandler}
        onChange={changeHandler}
        value={activePresetName}
      >
        <option key="empty_preset" value="" disabled>
          {/* TODO: use an explicit option text */}
          ---
        </option>
        {props.presets.map((preset) => (
          <option key={preset.name} value={preset.name}>
            {preset.name}
          </option>
        ))}
      </select>
    </Fragment>
  );
}

const mapDispatch = {
  changeActivePreset
};

export default connect(
  null,
  mapDispatch
)(PresetsSelector);
