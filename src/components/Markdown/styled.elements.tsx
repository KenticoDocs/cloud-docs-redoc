import { headerCommonMixin, linkifyMixin } from '../../common-elements';
import { PrismDiv } from '../../common-elements/PrismDiv';
import styled, { css, extensionsHook, ResolvedThemeInterface } from '../../styled-components';

import { StyledComponent } from 'styled-components';

export const linksCss = css`
  a {
    transition: 0.25s color;
    text-decoration: underline;
    color: ${props => props.theme.typography.links.color};

    &:visited {
      color: ${props => props.theme.typography.links.visited};
    }

    &:hover {
      text-decoration: none;
      color: ${props => props.theme.typography.links.hover};
    }
  }
`;

export const StyledMarkdownBlock = styled(PrismDiv as StyledComponent<
  'div',
  ResolvedThemeInterface,
  { compact?: boolean; inline?: boolean }
>)`
  font-family: ${props => props.theme.typography.fontFamily};
  font-weight: ${props => props.theme.typography.fontWeightRegular};
  line-height: ${props => props.theme.typography.lineHeight};

  p {
    padding: 0 0 1em;
    margin: 0;
    line-height: 1.625em;

    &:last-child {
      margin-bottom: 0;
      padding: 0;
    }
  }

  span {
    p {
      padding: 0;
    }

    ul {
      padding-left: 1.875em;
      padding-right: 0.5em;
    }
  }

  ${({ compact }) =>
    compact &&
    `
    p:first-child {
      margin-top: 0;
    }
    p:last-child {
      margin-bottom: 0;
    }
  `}

  ${({ inline }) =>
    inline &&
    ` p {
    display: inline-block;
  }`}

  h1 {
    ${headerCommonMixin(1)};
    color: ${props => props.theme.colors.primary.main};
    margin-top: 0;
  }

  h2 {
    ${headerCommonMixin(2)};
    color: ${props => props.theme.colors.text.primary};
    padding: 0.375em 0;
  }

  code {
    color: ${({ theme }) => theme.typography.code.color};
    background-color: ${({ theme }) => theme.typography.code.backgroundColor};

    font-family: ${props => props.theme.typography.code.fontFamily};
    border-radius: 2px;
    border: 1px solid rgba(38, 50, 56, 0.1);
    padding: 0 ${({ theme }) => theme.spacing.unit}px;
    font-size: ${props => props.theme.typography.code.fontSize};
    font-weight: ${({ theme }) => theme.typography.code.fontWeight};

    word-break: break-word;
  }

  pre {
    font-family: ${props => props.theme.typography.code.fontFamily};
    white-space: ${({ theme }) => (theme.typography.code.wrap ? 'pre-wrap' : 'pre')};
    background-color: transparent;
    color: white;
    padding: ${props => props.theme.spacing.unit * 4}px;
    overflow-x: auto;
    line-height: normal;
    border-radius: 0px;
    border: 1px solid rgba(38, 50, 56, 0.1);
    margin: 0;

    code {
      background-color: transparent;
      color: white;
      padding: 0;

      &:before,
      &:after {
        content: none;
      }
    }
  }

  blockquote {
    margin: 0;
    margin-bottom: 1em;
    padding: 0 15px;
    color: #777;
    border-left: 4px solid #ddd;
  }

  img {
    max-width: 100%;
    box-sizing: content-box;
  }

  ol {
    padding: 0 0 1.125em 1.125em;
    margin: 0 0 0 .75em;

    & > li {
      padding: 0 0 0.25em;
    }

    ol,
    ul {
      padding-bottom: 0;
    }
  }

  ul {
    padding: 0 0 1.125em 0.75em;
    margin: 0;
    list-style-type: none;

    & > li {
      padding: 0 0 0.25em 1.875em;
      position: relative;

      &:before {
        content: '';
        width: 0.875em;
        height: 0.4375em;
        border-radius: 0.25em 0.25em 0.25em 0;
        background-color: #f05a22;
        position: absolute;
        left: 0;
        top: 0.4625em;
      }
    }

    ol,
    ul {
      padding-bottom: 0;
    }
  }

  table {
    display: inline-block;
    width: auto;
    overflow: auto;
    word-break: normal;
    word-break: keep-all;
    border-collapse: separate;
    border-spacing: 0;
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    border-top: 0.125em solid #d7d7d7;
    border-left: 0.125em solid #d7d7d7;
    border-radius: 1.5em 1.5em 0.675em 1.5em;
    background-color: #fff;
  }

  table td,
  table th {
    border-bottom: 0.125em solid #d7d7d7;
    border-right: 0.125em solid #d7d7d7;
    padding: 1.5em 1.5em;
    box-sizing: border-box;
  }

  table tr {
    &:first-child {
      td,
      th {
        background-color: #f3f3f3;

        &:first-child {
          border-radius: 1.5em 0 0 0;
        }

        &:last-child {
          border-radius: 0 1.5em 0 0;
        }
      }
    }

    &:last-child {
      td,
      th {
        &:first-child {
          border-radius: 0 0 0 1.5em;
        }

        &:last-child {
          border-radius: 0 0 0.675em 0;
        }
      }
    }
  }

  table th {
    text-align: left;
    font-weight: 400;
    background-color: ${({ theme }) => theme.schema.nestedBackground};
  }

  table {
    ul,
    ol {
      p {
        margin: 0;
      }
    }
  }

  ${linkifyMixin('.share-link')};

  ${linksCss}

  ${extensionsHook('Markdown')};
`;
