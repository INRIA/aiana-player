import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { changeActivePreset } from '../../actions/presets';
import withUniqueId, { IInjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IPreset } from '../../reducers/presets';
import { CDispatch } from '../../store';

interface IProps {
  presets: IPreset[];
}

interface IDispatchProps {
  selectChangeHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface IPresetsSelector
  extends IInjectedUniqueIdProps,
    IProps,
    IDispatchProps {}

function PresetsSelector({
  presets,
  selectChangeHandler,
  uid
}: IPresetsSelector) {
  const [t] = useTranslation();
  const activePreset = presets.find((p) => p.selected === true);
  const activePresetName = activePreset ? activePreset.name : '';

  return (
    <React.Fragment>
      <span id={uid}>{t('preferences.presets_selector.label')}</span>
      <select
        aria-labelledby={uid}
        onChange={selectChangeHandler}
        value={activePresetName}
      >
        <option key="empty_preset" value="" />
        {presets.map((preset) => (
          <option key={preset.name} value={preset.name}>
            {preset.name}
          </option>
        ))}
      </select>
    </React.Fragment>
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
)(withUniqueId(PresetsSelector));
