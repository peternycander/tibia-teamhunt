import styled from 'styled-components';
import colors from 'globals/colors';

export default styled.div`
  width: 300px;
  background-color: ${colors.errorRed};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 3px;
  margin: 20px auto;
  box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.1);
`;
