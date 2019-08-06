import { observer } from 'mobx-react';
import * as React from 'react';

export interface ApiInfoProps {
  status?: string;
}

@observer
export class APIStatus extends React.Component<ApiInfoProps> {
  render() {
    return this.props.status ? <span className="api-status">{this.props.status}</span> : '';
  }
}
