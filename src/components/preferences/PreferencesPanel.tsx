import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { hexToHsla } from '../../utils/colors';
import styled from '../../utils/styled-components';
import { uid } from '../../utils/uniqueId';
import AssistiveText from '../a11y/AssistiveText';
import StyledSvg from '../shared/SvgIcon';
import SvgSettings from '../svg/Settings';
import ChaptersTrackSelector from './ChaptersTrackSelector';
import FontFaceSelector from './FontFaceSelector';
import FontUppercaseToggle from './FontUppercaseToggle';
import FontSizeSelector from './FontSizeSelector';
import LanguageSelector from './LanguageSelector';
import LineHeightSelector from './LineHeightSelector';
import PanelToggleButton from './PanelToggleButton';
import PlaybackRateSelector from './PlaybackRateSelector';
import SlidesTrackSelector from './SlidesTrackSelector';
import SubtitlesTrackSelector from './SubtitlesTrackSelector';
import TextHighlightingToggle from './TextHighlightingToggle';
import ThemeSelector from './ThemeSelector';
import WidgetsVisibility from './widgets/visibility/WidgetsVisibility';
import WidgetsLockToggle from './widgets/WidgetsLockToggle';
import MediaSourceSelector from './MediaSourceSelector';
import PresetsSelector from './PresetsSelector';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers';
import { IPreset } from '../../reducers/presets';
import ExportPreferences from './ExportPreferences';
import { IPreferencesState } from '../../reducers/preferences';
import ImportPreferences from './ImportPreferences';

interface IProps {
  preferences: IPreferencesState;
  presets: IPreset[];
}

const StyledPreferences = styled.div`
  display: inline-block;

  h2 {
    margin: 0;
    font-size: 1em;

    button {
      &,
      & svg {
        display: block;
      }
    }
  }

  .aip-preferences-panel {
    width: 50%;
    height: calc(100% - 0.5em - 2.25em - 0.3125em - 25%);
    max-width: 25em;
    max-height: 23em;

    padding: 1em;

    position: absolute;
    bottom: calc(0.5em + 2.25em + 0.3125em);
    right: 0;
    z-index: 2;

    overflow: auto;
    background-color: ${(props) => hexToHsla(props.theme.bg, 0.93)};

    select {
      font-size: inherit;
    }
  }

  ul {
    margin: 0;
    padding: 0;

    list-style: none;

    li {
      padding: 0.5em 0;

      display: flex;
      justify-content: space-between;
      align-items: center;

      & + li {
        border-top: 1px solid ${(props) => props.theme.bg};
      }

      > *:nth-child(2) {
        flex-shrink: 0;
      }
    }
  }
`;

function PreferencesPanel(props: IProps) {
  const [t] = useTranslation();
  const [isOpen, togglePanel] = useState(false);
  const ariaLabelId = uid();
  const prefsPanelId = uid();

  return (
    <StyledPreferences
      aria-labelledby={ariaLabelId}
      className="aip-preferences"
    >
      <h2 id={ariaLabelId}>
        <PanelToggleButton
          isExpanded={isOpen}
          clickHandler={() => togglePanel(!isOpen)}
          aria-controls={prefsPanelId}
        >
          <AssistiveText>{t('preferences.title')}</AssistiveText>
          <StyledSvg as={SvgSettings} />
        </PanelToggleButton>
      </h2>

      <div id={prefsPanelId} className="aip-preferences-panel" hidden={!isOpen}>
        <ul>
          <li>
            <PresetsSelector presets={props.presets} />
          </li>
          <li>
            <ImportPreferences />
          </li>
          <li>
            <ExportPreferences preferences={props.preferences} />
          </li>
          <li className="aip-language">
            <LanguageSelector />
          </li>
          <li>
            <MediaSourceSelector />
          </li>
          <li className="aip-playback-rate">
            <PlaybackRateSelector />
          </li>
          <li className="aip-theme">
            <ThemeSelector />
          </li>
          <li>
            <FontFaceSelector />
          </li>
          <li>
            <FontSizeSelector />
          </li>
          <li>
            <LineHeightSelector />
          </li>
          <li>
            <FontUppercaseToggle />
          </li>
          <li>
            <TextHighlightingToggle />
          </li>
          <li className="aip-subtitles-track">
            <SubtitlesTrackSelector />
          </li>
          <li className="aip-chapters-track">
            <ChaptersTrackSelector />
          </li>
          <li className="aip-slides-track">
            <SlidesTrackSelector />
          </li>
          <li className="aip-widgets-lock">
            <WidgetsLockToggle />
          </li>
          <li className="aip-widgets-visibility">
            <WidgetsVisibility />
          </li>
        </ul>
      </div>
    </StyledPreferences>
  );
}

function mapState(state: IAianaState) {
  return {
    preferences: state.preferences,
    presets: state.presets
  };
}

export default connect(mapState)(PreferencesPanel);
