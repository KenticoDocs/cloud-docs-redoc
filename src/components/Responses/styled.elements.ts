// import { transparentize } from 'polished';

import { UnderlinedHeader } from '../../common-elements';
import styled from '../../styled-components';
import { ResponseTitle } from './ResponseTitle';

export const StyledResponseTitle = styled(ResponseTitle)`
  display: block;
  border: 0;
  width: 100%;
  text-align: left;
  padding: 12px 10px;
  border-radius: 2px;
  margin-bottom: 8px;
  line-height: 1.5em;
  cursor: pointer;

  color: ${(props) => props.theme.colors.responses[props.type].color};
  background-color: ${(props) => props.theme.colors.responses[props.type].backgroundColor};
  &:focus {
    outline: auto;
    outline-color: ${(props) => props.theme.colors.responses[props.type].color};
  }
  ${(props) =>
    (props.empty &&
      `
cursor: default;
&::before {
  content: "—";
  font-weight: 400;
  width: 1.5em;
  text-align: center;
  display: inline-block;
  vertical-align: top;
}
&:focus {
  outline: 0;
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

export const Code = styled.strong`
  vertical-align: top;
`;
