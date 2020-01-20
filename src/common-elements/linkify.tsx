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
    content: '';
    font-size: 16px;
    width: 1.5em;
    height: 1.5em;
    background-size: 1em 1em;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDpub25lO3N0cm9rZTojZjA1YTIyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDtzdHJva2Utd2lkdGg6MnB4O308L3N0eWxlPjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzOTIuNCkiPjxwYXRoIGNsYXNzPSJhIiBkPSJNLTM4My40LDVoMTFhMi45NDYsMi45NDYsMCwwLDEsMywzVjIwYTIuOTQ2LDIuOTQ2LDAsMCwxLTMsM2gtMTRWOEEzLjAwOSwzLjAwOSwwLDAsMS0zODMuNCw1WiIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNLTM3Ni40LDVWMWgtMTJhMi45NDYsMi45NDYsMCwwLDAtMywzVjE0YTIuOTQ2LDIuOTQ2LDAsMCwwLDMsM2gyIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik0tMzgyLjQsMTAuNWg5Ii8+PHBhdGggY2xhc3M9ImEiIGQ9Ik0tMzgyLjQsMTQuNWg5Ii8+PHBhdGggY2xhc3M9ImEiIGQ9Ik0tMzgyLjQsMTguNWg5Ii8+PC9nPjwvc3ZnPg==');
    visibility: hidden;
    display: inline-block;
    vertical-align: middle;
    background-repeat: no-repeat;
    background-position: center center;
    border-radius: 0.5em;
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
