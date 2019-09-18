import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { changeLanguage } from '../../actions/preferences';
import { IAianaState } from '../../reducers';
import { CDispatch } from '../../store';
import useId from '../../hooks/useId';

interface IStateProps {
  language?: string;
  languages?: string[];
}

interface IDispatchProps {
  changeHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface ILanguageSelector extends IStateProps, IDispatchProps {}

function LanguageSelector(props: ILanguageSelector) {
  const [t] = useTranslation();
  const [id] = useId();

  return (
    <Fragment>
      <span id={id}>{t('preferences.UILanguage.label')}</span>
      <select
        aria-labelledby={id}
        onBlur={props.changeHandler}
        onChange={props.changeHandler}
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

function mapDispatch(dispatch: CDispatch) {
  return {
    changeHandler: (evt: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(changeLanguage(evt.currentTarget.value));
    }
  };
}

export default connect(
  mapState,
  mapDispatch
)(LanguageSelector);
