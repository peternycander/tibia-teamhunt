import styled from 'styled-components';
import colors from 'globals/colors';

export default styled.button`
  width: 150px;
  background-color: white;
  color: ${colors.black};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 20px;
  cursor: pointer;
  font-weight: 200;
  border-radius: 3px;
  box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  outline: none;
  &:hover {
    background-color: rgba(0, 0, 0, 0.01);
  }
`;
