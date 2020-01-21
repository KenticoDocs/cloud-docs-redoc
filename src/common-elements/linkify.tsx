import * as React from 'react';

import { StoreConsumer } from '../components/StoreBuilder';
import styled, { css } from '../styled-components';

import { HistoryService } from '../services';

// tslint:disable-next-line
export const linkifyMixin = className => css`
  ${className}, .linkify__StyledShareLink {
    cursor: pointer;
    position: absolute;
    right: -28px;
    padding: 0;
    line-height: 1;
    width: 20px;
    display: inline-block;
    opacity: 1;

    &:hover {
      &:before {
        background-color: #e8e8e8;
      }
    }
  }
  ${className}:before, .linkify__StyledShareLink:before {
    content: '#';
    font-size: 16px;
    width: 1.5em;
    text-align: center;
    padding: 0.25em 0;
    background-size: 1em 1em;
    visibility: hidden;
    display: inline-block;
    vertical-align: middle;
    background-repeat: no-repeat;
    background-position: center center;
    border-radius: 0.5em;
    color: #f05a22;
    text-align: center;
  }

  h1:hover
    > ${className}::before,
    h2:hover
    > ${className}::before,
    ${className}:hover::before,
    h2:hover
    > .linkify__StyledShareLink::before,
  .linkify__StyledShareLink:hover::before,
  h3:hover > .linkify__StyledShareLink::before,
  h4:hover > .linkify__StyledShareLink::before {
    visibility: visible;
  }
`;

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export class Link extends React.Component<{ to: string; className?: string; children?: any }> {
  navigate = (history: HistoryService, event) => {
    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();
      history.replace(this.props.to);
    }
  };

  render() {
    return (
      <StoreConsumer>
        {store => (
          <a
            className={this.props.className}
            href={store!.menu.history.linkForId(this.props.to)}
            onClick={this.navigate.bind(this, store!.menu.history)}
          >
            {this.props.children}
          </a>
        )}
      </StoreConsumer>
    );
  }
}

const StyledShareLink = styled(Link)`
  ${linkifyMixin('&')};
`;

export function ShareLink(props: { to: string }) {
  return <StyledShareLink to={props.to} />;
}
