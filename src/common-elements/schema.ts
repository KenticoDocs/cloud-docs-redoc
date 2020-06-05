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
  font-family: ${props => props.theme.typography.headings.fontFamily};
}
`;

export const OneOfButton = styled.li<{ active: boolean }>`
  display: inline-block;
  margin-right: 10px;
  font-size: 0.875em;
  cursor: pointer;
  border: 2px solid #4863be;
  padding: 6px 12px;
  border-radius: 32px 32px 8px 32px;

  ${props => {
    if (props.active) {
      return `
      color: white;
      background-color: #4863BE;
      `;
    } else {
      return `
        color: #4863BE;
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
