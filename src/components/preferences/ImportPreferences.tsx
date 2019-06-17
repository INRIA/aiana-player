import React, { Component, ChangeEvent } from 'react';
import { safeLoad } from 'js-yaml';
import Button from '../shared/Button';
import styled from '../../utils/styled-components';
import { connect } from 'react-redux';
import { WithTranslation, withTranslation } from 'react-i18next';
import { IPreferencesState } from '../../reducers/preferences';
import { importPreferences } from '../../actions/preferences';

interface IMapDispatch {
  importPreferences(preferences: Partial<IPreferencesState>): void;
}

interface IImportPreferences extends IMapDispatch, WithTranslation {}

interface IState {
  file: File | null;
}

const ActionButton = styled.button`
  width: auto;
`;

class ImportPreferences extends Component<IImportPreferences, IState> {
  state: IState = {
    file: null
  };

  // TODO: function to reset form

  changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.currentTarget.files) {
      this.setState({
        file: evt.currentTarget.files[0]
      });
    }
  };

  clickHandler = () => {
    const file = this.state.file;

    if (!file) {
      return;
    }

    let reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        this.props.importPreferences(safeLoad(reader.result as string));
      }
    };

    reader.readAsText(file, 'UTF-8');
  };

  render() {
    return (
      <form>
        <label>
          <span>{this.props.t('preferences.import.label')}</span>
          <input type="file" onChange={this.changeHandler} />
        </label>
        <button type="reset">{this.props.t('preferences.import.reset')}</button>
        <ActionButton type="button" as={Button} onClick={this.clickHandler}>
          {this.props.t('preferences.import.action')}
        </ActionButton>
      </form>
    );
  }
}

const mapDispatch = {
  importPreferences
};

export default connect(
  null,
  mapDispatch
)(withTranslation()(ImportPreferences));
