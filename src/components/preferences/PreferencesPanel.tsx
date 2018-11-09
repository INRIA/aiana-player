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

  h2 {
    margin: 0 auto 0.5rem;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      padding: 0.5em 0;
      line-height: 1.5;

      display: flex;
      justify-content: space-between;
      align-items: center;

      & + li {
        border-top: 1px solid ${(props) => props.theme.bg};
      }
    }
  }
`;

const PreferencesPanel: React.SFC<InjectedTranslateProps> = ({ t }) => (
  <StyledPanel className="aip-preferences">
    <h2>{t('preferences.title')}</h2>
    <ul>
      <li className="aip-language">
        <LanguageSelector />
      </li>
      <li className="aip-playback-rate">
        <PlaybackRateSelector />
      </li>
      <li className="aip-native-controls">
        <NativeControlsSwitch />
      </li>
      <li className="aip-theme">
        <ThemeSelector />
      </li>
      <li className="aip-subtitles-track">
        <SubtitlesTrackSelector />
      </li>
    </ul>
  </StyledPanel>
);

export default translate()(PreferencesPanel);
