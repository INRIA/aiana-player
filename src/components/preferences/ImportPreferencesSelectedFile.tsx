import React from 'react';
import styled from '../../utils/styled-components';

interface IProps {
  file: File | null;
}

const Message = styled.p`
  margin: 0.2em 0;
`;

function ImportPreferencesSelectedFile({ file }: IProps) {
  return (
    <Message>
      {file ? `You selected: ${file.name}` : 'No file selected'}
    </Message>
  );
}

export default ImportPreferencesSelectedFile;
