import * as React from 'react';
import { uid } from '../../utils/ui';

export interface InjectedUniqueIdProps {
  uid: string;
}

function withUniqueId(WrappedComponent: any) {
  return class extends React.Component {
    public render() {
      return <WrappedComponent uid={uid()} {...this.props} />;
    }
  };
}

export default withUniqueId;
