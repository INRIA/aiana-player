import React, { Component, ChangeEvent } from 'react';
import { safeLoad } from 'js-yaml';
import Button, { buttonMixin, focusMixin } from '../shared/Button';
import styled from '../../utils/styled-components';
import { connect } from 'react-redux';
import { WithTranslation, withTranslation } from 'react-i18next';
import { IPreferencesState } from '../../reducers/preferences';
import { importPreferences } from '../../actions/preferences';
import { uid } from '../../utils/uniqueId';
import { visuallyHiddenMixin } from '../a11y/AssistiveText';
import ImportPreferencesSelectedFile from './ImportPreferencesSelectedFile';

interface IMapDispatch {
  importPreferences(preferences: Partial<IPreferencesState>): void;
}

interface IImportPreferences extends IMapDispatch, WithTranslation {}

interface IState {
  file: File | null;
}

const ActionButton = styled(Button)`
  width: auto;
`;

const FileInput = styled.input`
  ${visuallyHiddenMixin};

  &:focus:not([data-focus-visible-added]),
  &[data-focus-visible-added] {
    ~ label {
      ${focusMixin};

      border-color: ${(props) => props.theme.actionBg};
      outline: 0;
    }
  }
`;

const Label = styled.label`
  ${buttonMixin};
`;

class ImportPreferences extends Component<IImportPreferences, IState> {
  state: IState = {
    file: null
  };

  changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      file: evt.currentTarget.files ? evt.currentTarget.files[0] : null
    });
  };

  loadFile = () => {
    const file = this.state.file;

    if (!file) {
      return;
    }

    let reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        this.props.importPreferences(safeLoad(reader.result as string));
        this.resetForm();
      }
    };

    reader.readAsText(file, 'UTF-8');
  };

  resetForm = () => {
    this.setState({ file: null });
  };

  render() {
    const fileInputId = `aip-file-load-${uid()}`;

    return (
      <form
        onReset={this.resetForm}
        aria-label={this.props.t('preferences.import.title')}
      >
        <FileInput
          id={fileInputId}
          type="file"
          accept=".txt,.yml,.yaml"
          onChange={this.changeHandler}
        />

        <Label htmlFor={fileInputId} className="button--small">
          {this.props.t('preferences.import.choose_file_label')}
        </Label>

        <ImportPreferencesSelectedFile file={this.state.file} />

        {this.state.file && (
          <ActionButton className="button--small" type="reset">
            {this.props.t('preferences.import.reset')}
          </ActionButton>
        )}

        {this.state.file && (
          <ActionButton
            className="button--small"
            onClick={this.loadFile}
            disabled={!this.state.file}
          >
            {this.props.t('preferences.import.submit')}
          </ActionButton>
        )}

        {/* TODO: load confirmation */}
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
