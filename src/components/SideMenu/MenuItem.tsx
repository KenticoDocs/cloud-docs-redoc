import { observer } from 'mobx-react';
import * as React from 'react';

import { ShelfIcon } from '../../common-elements/shelfs';
import { IMenuItem, OperationModel } from '../../services';
import { shortenHTTPVerb } from '../../utils/openapi';
import { APIStatus } from '../APIStatus';
import { MenuItems } from './MenuItems';
import { MenuItemLabel, MenuItemLi, MenuItemTitle, OperationBadge } from './styled.elements';

export interface MenuItemProps {
  item: IMenuItem;
  onActivate?: (item: IMenuItem) => void;
  withoutChildren?: boolean;
  status?: string;
}

@observer
export class MenuItem extends React.Component<MenuItemProps> {
  ref: Element | null;

  activate = (evt: React.MouseEvent<HTMLElement>) => {
    this.props.onActivate!(this.props.item);
    evt.stopPropagation();
  };

  componentDidMount() {
    this.scrollIntoViewIfActive();
  }

  componentDidUpdate() {
    this.scrollIntoViewIfActive();
  }

  scrollIntoViewIfActive() {
    if (this.props.item.active && this.ref) {
      this.ref.scrollIntoViewIfNeeded();
    }
  }

  saveRef = ref => {
    this.ref = ref;
  };

  render() {
    const { item, withoutChildren, status } = this.props;

    return (
      <MenuItemLi
        onClick={this.activate}
        depth={item.depth}
        ref={this.saveRef}
        data-item-id={item.id}
      >
        {item.type === 'operation' ? (
          <OperationMenuItemContent {...this.props} item={item as OperationModel} status={status} />
        ) : (
          <MenuItemLabel
            depth={item.depth}
            active={item.active}
            type={item.type}
            className={item.items.length > 0 ? 'has-subnav' : ''}
          >
            {(item.depth > 0 && item.items.length > 0 && (
              <ShelfIcon
                float={'left'}
                direction={item.expanded ? 'down' : 'right'}
                size={'1.5em'}
              />
            )) ||
              null}
            <MenuItemTitle title={item.name}>
              {item.name}
              {this.props.children}
            </MenuItemTitle>
          </MenuItemLabel>
        )}
        {!withoutChildren && item.items && item.items.length > 0 && (
          <MenuItems
            expanded={item.expanded}
            items={item.items}
            onActivate={this.props.onActivate}
            status={status}
          />
        )}
      </MenuItemLi>
    );
  }
}

export interface OperationMenuItemContentProps {
  item: OperationModel;
  status?: string;
}

@observer
class OperationMenuItemContent extends React.Component<OperationMenuItemContentProps> {
  render() {
    const { item, status } = this.props;
    return (
      <MenuItemLabel depth={item.depth} active={item.active} deprecated={item.deprecated}>
        <OperationBadge type={item.httpVerb}>{shortenHTTPVerb(item.httpVerb)}</OperationBadge>
        <MenuItemTitle width="calc(100% - 38px)">
          {item.name}
          {this.props.children}
        </MenuItemTitle>
        <APIStatus status={status} />
      </MenuItemLabel>
    );
  }
}
