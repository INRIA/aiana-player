import i18n from 'i18next';
import en from './en';
import fr from './fr';

const translationNS = 'aiana';

const config: i18n.InitOptions = {
  debug: false,
  defaultNS: translationNS,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
};

const i18nInstance = i18n.init(config);

i18nInstance.addResources('en', translationNS, en);
i18nInstance.addResources('fr', translationNS, fr);

export { i18nInstance, translationNS };
