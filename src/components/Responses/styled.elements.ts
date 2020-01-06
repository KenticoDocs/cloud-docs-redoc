// import { transparentize } from 'polished';

import { UnderlinedHeader } from '../../common-elements';
import styled from '../../styled-components';
import { ResponseTitle } from './ResponseTitle';

export const StyledResponseTitle = styled(ResponseTitle)`
  padding: 12px 10px;
  margin-bottom: 8px;
  line-height: 1.5em;
  cursor: pointer;
  transition: 0.25s background-color;
  color: ${props => props.theme.colors.responses[props.type].color};
  background-color: ${props => props.theme.colors.responses[props.type].backgroundColor};
  border-radius: 23px;
  border: 1px solid ${props => props.theme.colors.responses[props.type].color};

  &:hover {
    background-color: ${props => props.theme.colors.responses[props.type].backgroundColorHover};
  }

  span {
    p {
      padding: 0;
    }

    ul {
      padding: 1em 0.5em 0.5em 1.875em;
    }
  }

  ${props =>
    (props.empty &&
      `
cursor: default;
&::before {
  content: "—";
  font-weight: 700;
  width: 1.5em;
  text-align: center;
  display: inline-block;
}
`) ||
    ''};
`;

export const ResponseDetailsWrap = styled.div`
  padding: 0;
  position: relative;
  top: -4px;
`;

export const HeadersCaption = styled(UnderlinedHeader.withComponent('caption'))`
  text-align: left;
  margin-top: 1em;
  caption-side: top;
`;
