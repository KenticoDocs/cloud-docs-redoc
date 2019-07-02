import * as React from 'react';
import { ShelfIcon } from '../../common-elements';
import { OperationModel } from '../../services';
import { Markdown } from '../Markdown/Markdown';
import { OptionsContext } from '../OptionsProvider';
import { SelectOnClick } from '../SelectOnClick/SelectOnClick';

import { getBasePath } from '../../utils';
import {
  EndpointInfo,
  HttpVerb,
  OperationEndpointWrap,
  ServerItem,
  ServerRelativeURL,
  ServersOverlay,
  ServerUrl,
} from './styled.elements';

export interface EndpointProps {
  operation: OperationModel;

  hideHostname?: boolean;
  inverted?: boolean;
}

export interface EndpointState {
  expanded: boolean;
}

export class Endpoint extends React.Component<EndpointProps, EndpointState> {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  toggle = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { operation, inverted, hideHostname } = this.props;
    const { expanded } = this.state;

    // TODO: highlight server variables, e.g. https://{user}.test.com
    return (
      <OptionsContext.Consumer>
        {options => (
          <OperationEndpointWrap>
            <EndpointInfo onClick={this.toggle} expanded={expanded} inverted={inverted}>
              <HttpVerb type={operation.httpVerb}> {operation.httpVerb}</HttpVerb>{' '}
              <ServerRelativeURL>{operation.path}</ServerRelativeURL>
              <div className="see-full-url">See full URL</div>
              <ShelfIcon
                float={'right'}
                color={inverted ? 'black' : 'white'}
                size={'20px'}
                direction={expanded ? 'down' : 'right'}
                style={{ marginRight: '-25px' }}
              />
            </EndpointInfo>
            <ServersOverlay expanded={expanded}>
              {operation.servers.map(server => (
                <ServerItem key={server.url}>
                  <Markdown source={server.description || ''} compact={true} />
                  <SelectOnClick>
                    <ServerUrl>
                      <span>
                        {hideHostname || options.hideHostname
                          ? getBasePath(server.url)
                          : server.url}
                      </span>
                      {operation.path}
                    </ServerUrl>
                  </SelectOnClick>
                </ServerItem>
              ))}
            </ServersOverlay>
          </OperationEndpointWrap>
        )}
      </OptionsContext.Consumer>
    );
  }
}
