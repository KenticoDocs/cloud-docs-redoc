import styled, { css, extensionsHook } from '../styled-components';

const headerFontSize = {
  1: '1.875em',
  2: '1.3125em',
  3: '1.3125em',
};

export const headerCommonMixin = level => css`
  color: ${({ theme }) => theme.colors.primary.main};
  font-family: ${({ theme }) => theme.typography.headings.fontFamily};
  font-weight: ${({ theme }) => theme.typography.headings.fontWeight};
  font-size: ${headerFontSize[level]};
  line-height: ${({ theme }) => theme.typography.headings.lineHeight};
  margin: 0;
  display: inline-block;
  position: relative;
`;

export const H1 = styled.h1`
  ${headerCommonMixin(1)};
  padding: 0.375em 0;
  ${extensionsHook('H1')};
`;

export const H2 = styled.h2`
  ${headerCommonMixin(2)};
  padding: 0.375em 0;
  font-weight: 700;
  ${extensionsHook('H2')};
`;

export const H3 = styled.h2`
  ${headerCommonMixin(3)};
  font-style: italic;
  padding: 0.375em 0;

  ${extensionsHook('H3')};
`;

export const RightPanelHeader = styled.h3`
  color: ${({ theme }) => theme.rightPanel.textColor};

  ${extensionsHook('RightPanelHeader')};
`;

export const UnderlinedHeader = styled.h5`
  border-bottom: 1px solid rgba(38, 50, 56, 0.3);
  margin: 1em 0 0 0;
  color: rgba(38, 50, 56, 0.5);
  font-weight: normal;
  text-transform: uppercase;
  font-size: 1em;
  line-height: 20px;

  ${extensionsHook('UnderlinedHeader')};
`;
