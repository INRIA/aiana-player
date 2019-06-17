import React, { Fragment, Component } from 'react';
import { saveAs } from 'file-saver';
import styled from '../../utils/styled-components';
import { withTranslation, WithTranslation } from 'react-i18next';
import Button from '../shared/Button';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers';
import {
  IPreferencesState,
  preferencesToYAML
} from '../../reducers/preferences';
import { exportPreferences } from '../../actions/preferences';

interface IMapState {
  preferences: IPreferencesState;
}

interface IMapDispatch {
  exportPreferences(preferences: Partial<IPreferencesState>): void;
}

interface IExportPreferences extends IMapState, IMapDispatch, WithTranslation {}

const ActionButton = styled.button`
  width: auto;
`;

class ExportPreferences extends Component<IExportPreferences> {
  clickHandler = () => {
    const blob = new Blob([preferencesToYAML(this.props.preferences)], {
      type: 'text/plain;charset=utf-8'
    });
    saveAs(blob, 'aiana-preferences.txt');
    this.props.exportPreferences(this.props.preferences);
  };

  render() {
    return (
      <Fragment>
        <ActionButton as={Button} onClick={this.clickHandler}>
          {this.props.t('preferences.export.label')}
        </ActionButton>
      </Fragment>
    );
  }
}

function mapState(state: IAianaState) {
  return {
    preferences: state.preferences
  };
}

const mapDispatch = {
  exportPreferences
};

export default connect(
  mapState,
  mapDispatch
)(withTranslation()(ExportPreferences));
