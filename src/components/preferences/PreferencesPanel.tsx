import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from '../../utils/styled-components';
import LanguageSwitch from './LanguageSwitch';

const StyledPanel = styled.div`
  background-color: white;
  margin-top: 16px;
  padding: 16px;
  border: 1px solid #000;
  color: #000;
`;

const PreferencesPanel: React.SFC = () => (
  <StyledPanel className="aip-preferences">
    <div>
      <FormattedMessage id="preferences.title" />
    </div>
    <LanguageSwitch />
  </StyledPanel>
);

export default PreferencesPanel;
