import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import styled from 'src/utils/styled-components';
import NativeControlsSwitch from '../buttons/NativeControlsSwitch';
import LanguageSelector from './LanguageSelector';
import PlaybackRateSelector from './PlaybackRateSelector';
import SubtitlesTrackSelector from './SubtitlesTrackSelector';
import ThemeSelector from './ThemeSelector';

const StyledPanel = styled.div`
  /* TODO: remove debug styles */
  position: absolute;
  bottom: 4rem;
  right: 4rem;

  background-color: white;
  margin-top: 16px;
  padding: 16px;
  border: 1px solid #000;
  color: #000;
`;

const PreferencesPanel: React.SFC<InjectedTranslateProps> = ({ t }) => (
  <StyledPanel className="aip-preferences">
    <div>{t('preferences.title')}</div>
    <LanguageSelector />
    <PlaybackRateSelector />
    <NativeControlsSwitch />
    <ThemeSelector />
    <SubtitlesTrackSelector />
  </StyledPanel>
);

export default translate()(PreferencesPanel);
