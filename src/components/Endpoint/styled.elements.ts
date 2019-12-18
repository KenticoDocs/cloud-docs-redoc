import styled from '../../styled-components';

export const OperationEndpointWrap = styled.div`
  cursor: pointer;
  position: relative;
  margin-bottom: 5px;
`;

export const ServerRelativeURL = styled.span`
  font-family: ${props => props.theme.typography.code.fontFamily};
  margin-left: 10px;
  flex: 1;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const EndpointInfo = styled.div<{ expanded?: boolean; inverted?: boolean }>`
  padding: 10px 30px 10px ${props => (props.inverted ? '10px' : '20px')};
  border-radius: ${props => (props.inverted ? '0' : '4px 4px 0 0')};
  background-color: ${props =>
    props.inverted ? 'transparent' : props.theme.codeSample.backgroundColor};
  display: flex;
  white-space: nowrap;
  align-items: center;
  border: ${props => (props.inverted ? '0' : '1px solid transparent')};
  border-bottom: ${props => (props.inverted ? '1px solid #ccc' : '0')};
  transition: border-color 0.25s ease;

  ${props =>
    (props.expanded && !props.inverted && `border-color: ${props.theme.colors.border.dark};`) || ''}

  .${ServerRelativeURL} {
    color: ${props => (props.inverted ? props.theme.colors.text.primary : '#ffffff')}
  }
`;

export const HttpVerb = styled.span.attrs((props: { type: string }) => ({
  className: `http-verb ${props.type}`,
}))<{ type: string }>`
  font-size: 1em;
  line-height: 20px;
  background-color: ${(props: any) => props.theme.colors.http[props.type] || '#999999'};
  color: #ffffff;
  padding: 6px 12px 4px;
  text-transform: uppercase;
  font-family: ${props => props.theme.typography.headings.fontFamily};
  margin: 0;
  border-radius: 20px 20px 20px 8px;
`;

export const ServersOverlay = styled.div<{ expanded: boolean }>`
  position: absolute;
  width: 100%;
  z-index: 100;
  background: #fff;
  color: #263238;
  box-sizing: border-box;
  box-shadow: 0 0 2em 0 rgba(35, 31, 32, 0.25);
  overflow: hidden;
  transition: all 0.25s ease;
  margin-top: 6px;
  border-radius: 8px 20px 20px 20px;

  ${props => (props.expanded ? '' : 'transform: translateY(-50%) scaleY(0);')}
`;

export const ServerItem = styled.div`
  padding: 1.125em 1.875em;
`;

export const ServerUrl = styled.div`
  padding: 0.875em 1.25em;
  border: 1px solid rgba(35, 31, 32, 0.25);
  background: #fff;
  word-break: break-all;
  border-radius: 0.5714em 1.4285em 1.4285em 1.4285em;
  color: ${props => props.theme.colors.primary.main};
  > span {
    color: ${props => props.theme.colors.text.primary};
  }
`;
