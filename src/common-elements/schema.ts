import styled from '../styled-components';

export const OneOfList = styled.ul`
  margin: 0 0 3px 0;
  padding: 0;
  list-style: none;
  display: inline-block;
`;

export const OneOfLabel = styled.span`
  font-size: 0.9em;
  margin-right: 10px;
  color: ${props => props.theme.colors.primary.main};
  font-family: Montserrat;
}
`;

export const OneOfButton = styled.li<{ active: boolean }>`
  display: inline-block;
  margin-right: 10px;
  font-size: 0.8em;
  cursor: pointer;
  border: 2px solid ${props => props.theme.typography.links.color};
  padding: 2px 10px;

  ${props => {
    if (props.active) {
      return `
      color: white;
      background-color: ${props.theme.typography.links.color};
      `;
    } else {
      return `
        color: ${props.theme.typography.links.color};
        background-color: transparent;

        &:hover {
          background-color: #fff;
        }
      `;
    }
  }}
`;

export const ArrayOpenningLabel = styled.div`
  font-size: 0.9em;
  font-family: ${props => props.theme.typography.code.fontFamily};
  &::after {
    content: ' [';
  }
`;

export const ArrayClosingLabel = styled.div`
  font-size: 0.9em;
  font-family: ${props => props.theme.typography.code.fontFamily};
  &::after {
    content: ']';
  }
`;
