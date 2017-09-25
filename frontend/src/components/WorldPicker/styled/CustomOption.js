import styled from 'styled-components';
import colors from 'globals/colors';

export default styled.div`
  background-color: ${props => (props.selected ? colors.backgroundGray : 'white')};
  font-size: 2px;
  padding: 5px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  font-weight: 300;
  align-items: center;
  border: 1px solid ${colors.borderGray};
  border-width: 0 0 1px 0;
  cursor: pointer;
  &:hover {
    background-color: ${colors.backgroundGray};
  }
`;
