import { observer } from 'mobx-react';
import * as React from 'react';

import { ExternalDocumentation } from '../ExternalDocumentation/ExternalDocumentation';
import { AdvancedMarkdown } from '../Markdown/AdvancedMarkdown';

import { H1, H2, MiddlePanel, Row, Section, ShareLink } from '../../common-elements';
import { ContentItemModel } from '../../services/MenuBuilder';
import { GroupModel, OperationModel } from '../../services/models';
import { Operation } from '../Operation/Operation';

@observer
export class ContentItems extends React.Component<{
  items: ContentItemModel[];
  status: string;
}> {
  render() {
    const items = this.props.items;
    const status = this.props.status;

    if (items.length === 0) {
      return null;
    }
    return items.map(item => <ContentItem item={item} key={item.id} status={status} />);
  }
}

export interface ContentItemProps {
  item: ContentItemModel;
  status: string;
}

@observer
export class ContentItem extends React.Component<ContentItemProps> {
  render() {
    const item = this.props.item;
    const status = this.props.status;

    let content;
    const { type } = item;
    switch (type) {
      case 'group':
        content = null;
        break;
      case 'tag':
      case 'section':
        content = <SectionItem {...this.props} />;
        break;
      case 'operation':
        content = <OperationItem item={item as any} status={status} />;
        break;
      default:
        content = <SectionItem {...this.props} />;
    }

    return (
      <>
        {content && (
          <Section id={item.id} underlined={item.type === 'operation'}>
            {content}
          </Section>
        )}
        {item.items && <ContentItems items={item.items} status={status} />}
      </>
    );
  }
}

const middlePanelWrap = component => <MiddlePanel>{component}</MiddlePanel>;

@observer
export class SectionItem extends React.Component<ContentItemProps> {
  render() {
    const { name, description, externalDocs, level } = this.props.item as GroupModel;

    const Header = level === 2 ? H2 : H1;
    return (
      <>
        <Row>
          <MiddlePanel>
            <Header>
              <ShareLink to={this.props.item.id} />
              {name}
            </Header>
          </MiddlePanel>
        </Row>
        <AdvancedMarkdown source={description || ''} htmlWrap={middlePanelWrap} />
        {externalDocs && (
          <Row>
            <MiddlePanel>
              <ExternalDocumentation externalDocs={externalDocs} />
            </MiddlePanel>
          </Row>
        )}
      </>
    );
  }
}

@observer
export class OperationItem extends React.Component<{
  item: OperationModel;
  status: string;
}> {
  render() {
    return <Operation operation={this.props.item} status={this.props.status} />;
  }
}
