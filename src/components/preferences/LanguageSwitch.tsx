import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store/index';
import styled from '../../utils/styled-components';
import LanguageSwitchButton from './LanguageSwitchButton';

interface IProps {
  availableLanguages: string[];
  currentLanguage: string;
}

const StyledDiv = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.bg};
`;

class LanguageSwitch extends React.Component<IProps & IConnectedReduxProps> {
  public render() {
    const { availableLanguages, currentLanguage } = this.props;

    return (
      <StyledDiv className="aip-language-switch">
        <span>current: {currentLanguage}</span>
        {availableLanguages
          .filter((lang) => lang !== currentLanguage)
          .map((language) => (
            <LanguageSwitchButton key={language} language={language} />
          ))}
      </StyledDiv>
    );
  }
}

export default connect((state: IAianaState) => ({
  availableLanguages: state.preferences.availableLanguages,
  currentLanguage: state.preferences.language
}))(LanguageSwitch);
