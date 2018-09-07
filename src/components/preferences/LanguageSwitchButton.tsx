import * as React from 'react';
import { connect } from 'react-redux';
import { changeLanguage } from '../../actions/preferences';
import { IConnectedReduxProps } from '../../store/index';
import StyledButton from '../styled/StyledButton';

interface IProps {
  language: string;
}

class LanguageSwitchButton extends React.Component<
  IProps & IConnectedReduxProps
> {
  public render() {
    const { language } = this.props;

    return (
      <StyledButton type="button" onClick={this.handleClick}>
        {language}
      </StyledButton>
    );
  }
  private handleClick = () => {
    const { dispatch, language } = this.props;

    dispatch(changeLanguage(language));
  };
}

export default connect()(LanguageSwitchButton);
