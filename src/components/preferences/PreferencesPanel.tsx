import React, { Component } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import styled from '../../utils/styled-components';
import { uid } from '../../utils/ui';
import AssistiveText from '../a11y/AssistiveText';
import StyledSvg from '../shared/styled-svg';
import SvgSettings from '../svg/Settings';
import ChaptersMenuToggle from './ChaptersMenuToggle';
import ChaptersTrackSelector from './ChaptersTrackSelector';
import LanguageSelector from './LanguageSelector';
import { PanelToggle } from './panel-toggle';
import PlaybackRateSelector from './PlaybackRateSelector';
import SlidesTrackSelector from './SlidesTrackSelector';
import SubtitlesTrackSelector from './SubtitlesTrackSelector';
import ThemeSelector from './ThemeSelector';
import WindowsVisibility from './windows/visibility/WindowsVisibility';
import WindowsLockToggle from './windows/WindowsLockToggle';

interface IState {
  isOpen: boolean;
}

const StyledPreferences = styled.div`
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

const defaultState: IState = {
  isOpen: false
};

class PreferencesPanel extends Component<WithTranslation, IState> {
  readonly state = defaultState;

  render() {
    const t = this.props.t;
    const ariaLabelId = uid();

    return (
      <StyledPreferences
        aria-labelledby={ariaLabelId}
        className="aip-preferences"
      >
        <h2 id={ariaLabelId}>
          <PanelToggle
            isExpanded={this.state.isOpen}
            clickHandler={this.togglePanel}
          >
            <AssistiveText>{t('preferences.title')}</AssistiveText>
            <StyledSvg as={SvgSettings} aria-hidden="true" />
          </PanelToggle>
        </h2>

        <div className="aip-preferences-panel" hidden={!this.state.isOpen}>
          <ul>
            <li className="aip-language">
              <LanguageSelector />
            </li>
            <li className="aip-playback-rate">
              <PlaybackRateSelector />
            </li>
            <li className="aip-theme">
              <ThemeSelector />
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
            <li className="aip-chapters-menu">
              <ChaptersMenuToggle />
            </li>
            <li className="aip-windows-lock">
              <WindowsLockToggle />
            </li>
            <li className="aip-windows-visibility">
              <WindowsVisibility />
            </li>
          </ul>
        </div>
      </StyledPreferences>
    );
  }

  togglePanel = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
}

export default withTranslation()(PreferencesPanel);
