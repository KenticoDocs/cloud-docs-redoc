import { observer } from 'mobx-react';
import * as React from 'react';

import { AppStore } from '../../services/AppStore';

export interface ApiInfoProps {
  store: AppStore;
}

@observer
export class Breadcrumbs extends React.Component<ApiInfoProps> {
  render() {
    const { store } = this.props;
    const { info } = store.spec;

    return (
      <ul className="breadcrumbs">
        <li>
          <a href="/new-reference"> API Reference</a>
        </li>
        <li>
          <span>
            {info.title} {info.version}
          </span>
        </li>
      </ul>
    );
  }
}
