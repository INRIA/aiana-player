import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { changeLanguage } from '../../actions/preferences';
import { IAianaState } from '../../reducers';
import useId from '../../hooks/useId';

interface IStateProps {
  language: string;
  languages: string[];
}

interface IDispatchProps {
  changeLanguage(lang: string): void;
}

interface ILanguageSelector extends IStateProps, IDispatchProps {}

function LanguageSelector(props: ILanguageSelector) {
  const [t] = useTranslation();
  const [id] = useId();

  const changeHandler = (evt: React.SyntheticEvent<HTMLSelectElement>) => {
    if (evt.currentTarget.value !== props.language) {
      props.changeLanguage(evt.currentTarget.value);
    }
  };

  return (
    <Fragment>
      <span id={id}>{t('preferences.UILanguage.label')}</span>
      <select
        aria-labelledby={id}
        onBlur={changeHandler}
        onChange={changeHandler}
        value={props.language}
      >
        {props.languages &&
          props.languages.map((language) => (
            <option key={language} value={language}>
              {t(`languages.${language}`)}
            </option>
          ))}
      </select>
    </Fragment>
  );
}

function mapState(state: IAianaState) {
  return {
    language: state.preferences.language,
    languages: state.preferences.languages
  };
}

const mapDispatch = {
  changeLanguage
};

export default connect(
  mapState,
  mapDispatch
)(LanguageSelector);
