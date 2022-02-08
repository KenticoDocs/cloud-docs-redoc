import { observer } from 'mobx-react';
import * as React from 'react';

import { AppStore } from '../../services/AppStore';
import { APIStatus } from '../APIStatus';

export interface ApiInfoProps {
  store: AppStore;
  status?: string;
}

@observer
export class Breadcrumbs extends React.Component<ApiInfoProps> {
  render() {
    const { store, status } = this.props;
    const { info } = store.spec;

    return (
      <ul className="breadcrumbs">
        <li>
          <a href="/learn/reference"> API Reference</a>
        </li>
        <li>
          <span>
            {info.title}
            <APIStatus status={status} />
          </span>
        </li>
      </ul>
    );
  }
}
