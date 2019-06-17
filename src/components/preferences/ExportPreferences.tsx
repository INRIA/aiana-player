import React, { Fragment } from 'react';
import { saveAs } from 'file-saver';
import styled from '../../utils/styled-components';
import { useTranslation } from 'react-i18next';
import Button from '../shared/Button';
import { connect } from 'react-redux';
import {
  IPreferencesState,
  preferencesToYAML
} from '../../reducers/preferences';
import { exportPreferences } from '../../actions/preferences';
import { CDispatch } from '../../store';

interface IOwnProps {
  preferences: IPreferencesState;
}

interface IMapDispatch {
  clickHandler(): void;
}

interface IExportPreferences extends IOwnProps, IMapDispatch {}

const ActionButton = styled.button`
  width: auto;
`;

function ExportPreferences(props: IExportPreferences) {
  const [t] = useTranslation();

  return (
    <Fragment>
      <ActionButton as={Button} onClick={props.clickHandler}>
        {t('preferences.export.label')}
      </ActionButton>
    </Fragment>
  );
}

function mapDispatch(dispatch: CDispatch, ownProps: IOwnProps) {
  return {
    clickHandler: () => {
      const blob = new Blob([preferencesToYAML(ownProps.preferences)], {
        type: 'text/plain;charset=utf-8'
      });
      saveAs(blob, 'aiana-preferences.txt');
      dispatch(exportPreferences(ownProps.preferences));
    }
  };
}

export default connect(
  null,
  mapDispatch
)(ExportPreferences);
