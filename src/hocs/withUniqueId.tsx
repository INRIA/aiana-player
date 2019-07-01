import React, { ComponentType } from 'react';
import { uid } from '../utils/uniqueId';

export interface IInjectedUniqueIdProps {
  uid: string;
}

function withUniqueId(WrappedComponent: ComponentType<any>) {
  return (props: any) => <WrappedComponent uid={uid()} {...props} />;
}

export default withUniqueId;
