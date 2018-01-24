import styled from 'styled-components';
import colors from 'globals/colors';

export const Player = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px;
  border-radius: 2px;
  margin-bottom: 2px;
  font-size: 11px;
  background-color: ${props => (props.sharable ? colors.highlightGreen : 'inherit')};
`;

export const VocationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  grid-column-gap: 20px;
`;
