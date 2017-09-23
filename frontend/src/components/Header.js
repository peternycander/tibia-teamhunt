import styled from 'styled-components';
import colors from 'globals/colors';

export default styled.header`
  height: 15vh;
  min-height: 80px;
  max-height: 200px;
  background-color: ${colors.backgroundGray};
  font-style: italic;
  font-size: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
