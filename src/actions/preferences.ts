import { i18nInstance } from '../translations';

export const CHANGE_LANGUAGE = 'aiana/CHANGE_LANGUAGE';

export function changeLanguage(language: string) {
  i18nInstance.changeLanguage(language);

  return {
    language,
    type: CHANGE_LANGUAGE
  };
}
