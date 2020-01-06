import styled from '../styled-components';
import { PrismDiv } from './PrismDiv';

export const SampleControls = styled.div`
  opacity: 1;
  transition: opacity 0.3s ease;
  text-align: right;

  > span {
    display: inline-block;
    padding: 2px 10px;
    cursor: pointer;
    color: #908e8f;
    font-size: 0.875em;
    border-radius: 16px;

    :hover {
      background: #e8e8e8;
    }
  }
`;

export const SampleControlsWrap = styled.div`
  &:hover ${SampleControls} {
    opacity: 1;
  }
`;

export const StyledPre = styled(PrismDiv.withComponent('pre'))`
  font-family: ${props => props.theme.typography.code.fontFamily};
  font-size: ${props => props.theme.typography.code.fontSize};
  overflow-x: auto;
  margin: 0;

  white-space: ${({ theme }) => (theme.typography.code.wrap ? 'pre-wrap' : 'pre')};
`;
