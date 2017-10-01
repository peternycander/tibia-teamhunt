import styled from 'styled-components';
import colors from 'globals/colors';

export default styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px;
  border-radius: 2px;
  margin-bottom: 2px;
  font-size: 11px;
  background-color: ${props => (props.sharable ? colors.highlightGreen : 'inherit')};
`;
