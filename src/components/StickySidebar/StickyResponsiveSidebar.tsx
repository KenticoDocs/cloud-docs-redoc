import { observer } from 'mobx-react';
import * as React from 'react';

import { MenuStore } from '../../services/MenuStore';
import { RedocNormalizedOptions, RedocRawOptions } from '../../services/RedocNormalizedOptions';
import styled, { media } from '../../styled-components';
import { IS_BROWSER } from '../../utils/index';
import { OptionsContext } from '../OptionsProvider';
import { AnimatedChevronButton } from './ChevronSvg';

let Stickyfill;
if (IS_BROWSER) {
  Stickyfill = require('stickyfill');
}

export interface StickySidebarProps {
  className?: string;
  scrollYOffset?: RedocRawOptions['scrollYOffset']; // passed directly or via context
  menu: MenuStore;
}

export interface StickySidebarState {
  offsetTop?: string;
}

const stickyfill = Stickyfill && Stickyfill();

const StyledStickySidebar = styled.div<{ open?: boolean }>`
  width: ${props => props.theme.sidebar.width};
  background-color: ${props => props.theme.sidebar.backgroundColor};
  overflow: hidden;
  display: flex;
  flex-direction: column;

  backface-visibility: hidden;
  /* contain: strict; TODO: breaks layout since Chrome 80*/

  height: 100vh;
  position: sticky;
  position: -webkit-sticky;
  top: 0;

  ${media.lessThan('small')`
    position: fixed;
    z-index: 20;
    width: 100%;
    background: ${({ theme }) => theme.sidebar.backgroundColor};
    display: ${props => (props.open ? 'flex' : 'none')};
  `};

  @media print {
    display: none;
  }
`;

const FloatingButton = styled.div`
  outline: none;
  user-select: none;
  background-color: #fff;
  color: ${props => props.theme.colors.primary.main};
  display: none;
  cursor: pointer;
  position: fixed;
  right: 16px;
  z-index: 100;
  border-radius: 50%;
  ${media.lessThan('small')`
    display: flex;
  `};

  top: 16px;

  width: 48px;
  height: 48px;
  padding: 0 8px;
  justify-content: center;
  align-items: center;

  @media print {
    display: none;
  }

  .nav-trigger-off,
  .nav-trigger-on {
    position: relative;
    top: 2px;
  }

  .nav-trigger-on {
    &:before {
      content: '\\e64a';
      font-family: 'kentico-icons';
      font-size: 1.5em;
      color: #6b7c85;
    }
  }

  .nav-trigger-off {
    &:before {
      content: '\\e650';
      font-family: 'kentico-icons';
      font-size: 1.5em;
      color: #6b7c85;
    }
  }
`;

@observer
export class StickyResponsiveSidebar extends React.Component<
  StickySidebarProps,
  StickySidebarState
> {
  static contextType = OptionsContext;
  context!: React.ContextType<typeof OptionsContext>;
  state: StickySidebarState = { offsetTop: '0px' };

  stickyElement: Element;

  componentDidMount() {
    if (stickyfill) {
      stickyfill.add(this.stickyElement);
    }

    // rerender when hydrating from SSR
    // see https://github.com/facebook/react/issues/8017#issuecomment-256351955
    this.setState({
      offsetTop: this.getScrollYOffset(this.context),
    });
  }

  componentWillUnmount() {
    if (stickyfill) {
      stickyfill.remove(this.stickyElement);
    }
  }

  getScrollYOffset(options: RedocNormalizedOptions) {
    let top;
    if (this.props.scrollYOffset !== undefined) {
      top = RedocNormalizedOptions.normalizeScrollYOffset(this.props.scrollYOffset)();
    } else {
      top = options.scrollYOffset();
    }
    return top + 'px';
  }

  render() {
    const open = this.props.menu.sideBarOpened;

    const top = this.state.offsetTop;

    return (
      <>
        <StyledStickySidebar
          open={open}
          className={this.props.className}
          style={{
            top,
            height: `calc(100vh - ${top})`,
          }}
          // tslint:disable-next-line
          ref={el => {
            this.stickyElement = el as any;
          }}
        >
          {this.props.children}
        </StyledStickySidebar>
        <FloatingButton onClick={this.toggleNavMenu}>
          <AnimatedChevronButton open={open} />
        </FloatingButton>
      </>
    );
  }

  private toggleNavMenu = () => {
    this.props.menu.toggleSidebar();
  };
}
