import React from 'react';
import styled from '../../utils/styled-components';
import { useTranslation } from 'react-i18next';

interface IProps {
  file: File | null;
}

const Message = styled.p`
  margin: 0.2em 0;
`;

function ImportPreferencesSelectedFile({ file }: IProps) {
  const [t] = useTranslation();

  return (
    <Message>
      {file
        ? t('preferences.import.selected_file', { filename: file.name })
        : t('preferences.import.no_selected_file')}
    </Message>
  );
}

export default ImportPreferencesSelectedFile;
