import styled from 'styled-components';
import colors from 'globals/colors';

export default styled.div`
  background-color: ${props => (props.selected ? colors.backgroundGray : 'white')};
  font-size: 2px;
  padding: 8px 0 8px 12px;
  font-size: 0.85rem;
  display: flex;
  font-weight: 300;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: ${colors.backgroundGray};
  }
`;
