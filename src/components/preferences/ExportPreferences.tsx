import React from 'react';
import { saveAs } from 'file-saver';
import styled from '../../utils/styled-components';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import {
  IPreferencesState,
  preferencesToYAML
} from '../../reducers/preferences';
import { exportPreferences } from '../../actions/preferences';
import Button from '../shared/Button';

interface IProps {
  preferences: IPreferencesState;
}

interface IMapDispatch {
  exportPreferences(preferences: IPreferencesState): void;
}

interface IExportPreferences extends IProps, IMapDispatch {}

const ActionButton = styled(Button)`
  width: auto;
`;

function ExportPreferences(props: IExportPreferences) {
  const [t] = useTranslation();

  return (
    <ActionButton
      className="button--small"
      onClick={() => {
        const blob = new Blob([preferencesToYAML(props.preferences)], {
          type: 'text/plain;charset=utf-8'
        });
        saveAs(blob, 'aiana-preferences.txt');
        props.exportPreferences(props.preferences);
      }}
    >
      {t('preferences.export.label')}
    </ActionButton>
  );
}

const mapDispatch = {
  exportPreferences
};

export default connect(
  null,
  mapDispatch
)(ExportPreferences);
