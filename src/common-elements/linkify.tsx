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
    opacity: 0.4;

    &:hover {
      opacity: 0.6;
    }
  }
  ${className}:before, .linkify__StyledShareLink:before {
    content: '';
    width: 15px;
    height: 15px;
    background-size: contain;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTQwIiBoZWlnaHQ9Ijk0NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KU29ycnksIHlvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGlubGluZSBTVkcuCiA8Zz4KICA8dGl0bGU+YmFja2dyb3VuZDwvdGl0bGU+CiAgPHJlY3QgZmlsbD0ibm9uZSIgaWQ9ImNhbnZhc19iYWNrZ3JvdW5kIiBoZWlnaHQ9IjQwMiIgd2lkdGg9IjU4MiIgeT0iLTEiIHg9Ii0xIi8+CiA8L2c+CiA8Zz4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiAgPHBhdGggc3Ryb2tlPSJudWxsIiB0cmFuc2Zvcm09InJvdGF0ZSgtMTgwIDUwMS4zNTI1Njk1ODAwNzgyLDQ3My4wNDA4NjMwMzcxMDkzKSAiIGlkPSJzdmdfMSIgZD0ibTQ0MS4wNzc5OTQsNjUwLjQwMDU1OGwwLjAxODgzNiwyOTUuNTk5NDY5bDI0MS4wNzk0ODgsMGwwLC03NjguNTU4NjE5bC01NDIuNDcxMjI5LDBsMCw0NzIuOTU5MTVsMzAxLjM3MjkwNSwwem0tMzAxLjM3MjkwNSw1OS4xMTk4OTRsMjQxLjExNzE2LDIzNi40Nzk1NzVsLTAuMDE4ODM2LC0yMzYuNDc5NTc1bC0yNDEuMDk4MzI0LDB6bTYwMi43NDU4MSwtNTkxLjE5ODkzOGwwLDcwOS40Mzg3MjZsMTIwLjU0OTE2MiwwbDAsLTgyNy42Nzg1MTNsLTYwMi43NDU4MSwwbDAsMTE4LjIzOTc4OGw0MjEuOTIyMDY3LDBsNjAuMjc0NTgxLDB6Ii8+CiA8L2c+PC9zdmc+');
    visibility: hidden;
    display: inline-block;
    vertical-align: middle;
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
