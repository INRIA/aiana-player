import { InjectedTranslateProps } from 'react-i18next';
import { IConnectedReduxProps } from '../store';

export interface ITransnected
  extends InjectedTranslateProps,
    IConnectedReduxProps {}
