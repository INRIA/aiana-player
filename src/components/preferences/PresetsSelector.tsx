import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { changeActivePreset } from '../../actions/presets';
import withUniqueId, { IInjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IPreset, getActivePreset } from '../../reducers/presets';
import { CDispatch } from '../../store';

interface IProps {
  // TODO: can presets be null?
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
  const activePreset = getActivePreset(presets);
  const activePresetName = activePreset ? activePreset.name : '';

  return (
    <Fragment>
      <span id={uid}>{t('preferences.presets_selector.label')}</span>
      <select
        aria-labelledby={uid}
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
)(withUniqueId(PresetsSelector));

// TODO: diff preferences and preset here?
