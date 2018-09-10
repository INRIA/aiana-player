import en from './en';
import fr from './fr';

export interface ITranslation {
  [key: string]: string;
}

export interface ITranslationsCollection {
  [key: string]: ITranslation;
}

const translationsCollection: ITranslationsCollection = { en, fr };

export default translationsCollection;
