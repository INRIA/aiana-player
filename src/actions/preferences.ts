export const CHANGE_LANGUAGE = 'aiana/CHANGE_LANGUAGE';

export function changeLanguage(language: string) {
  return {
    language,
    type: CHANGE_LANGUAGE
  };
}
