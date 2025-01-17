// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ReactDropdown from 'react-dropdown';

import { transparentize } from 'polished';
import styled from '../../styled-components';
import { StyledDropdown } from '../../common-elements';

export const MimeLabel = styled.div`
  padding: 0.9em;
  background-color: ${({ theme }) => transparentize(0.6, theme.rightPanel.backgroundColor)};
  margin: 0 0 10px 0;
  display: block;
  font-family: ${({ theme }) => theme.typography.headings.fontFamily};
  font-size: 0.929em;
  line-height: 1.5em;
`;

export const DropdownLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.headings.fontFamily};
  font-size: 12px;
  position: absolute;
  z-index: 1;
  top: -11px;
  left: 12px;
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  color: ${({ theme }) => transparentize(0.6, theme.rightPanel.textColor)};
`;

export const DropdownWrapper = styled.div`
  position: relative;
`;

export const InvertedSimpleDropdown = styled(StyledDropdown)`
  margin-left: 10px;
  text-transform: none;
  font-size: 1em;
  margin: 0 0 10px 0;
  display: block;
  background-color: ${({ theme }) => transparentize(0.6, theme.rightPanel.backgroundColor)};
  .Dropdown-placeholder {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .Dropdown-control {
    margin-top: 0;
  }
  .Dropdown-control,
  .Dropdown-control:hover {
    font-size: 1em;
    border: none;
    padding: 0.9em 1.6em 0.9em 0.9em;
    background: transparent;
    color: ${({ theme }) => theme.rightPanel.textColor};
    box-shadow: none;

    .Dropdown-arrow {
      border-top-color: ${({ theme }) => theme.rightPanel.textColor};
    }
  }
  .Dropdown-menu {
    margin: 0;
    margin-top: 2px;
    .Dropdown-option {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
`;

export const NoSampleLabel = styled.div`
  font-family: ${props => props.theme.typography.code.fontFamily};
  font-size: 12px;
  color: #ee807f;
`;
