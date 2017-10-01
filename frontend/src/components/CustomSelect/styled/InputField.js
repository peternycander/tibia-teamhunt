import styled from 'styled-components';
import colors from 'globals/colors';

export default styled.input.attrs({
  type: 'text'
})`
  padding: 5px;
  border-radius: 4px;
  border: 0;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 300;
  text-align: center;
  transition: all 0.3s ease-in-out;
  background: ${props => {
    if (props.writable) {
      return props.validSelection ? colors.okGreen : colors.errorRed;
    }
    return colors.solidGray;
  }};
  color: white;
  outline: none;
  cursor: pointer;
`;
