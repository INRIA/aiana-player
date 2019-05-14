import React from 'react';
import { uid } from '../utils/ui';

export interface IInjectedUniqueIdProps {
  uid: string;
}

function withUniqueId(WrappedComponent: React.ComponentType<any>) {
  return (props: any) => <WrappedComponent uid={uid()} {...props} />;
}

export default withUniqueId;
