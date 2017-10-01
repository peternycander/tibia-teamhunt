import styled from 'styled-components';
import colors from 'globals/colors';

export default styled.div`
  display: flex;
  width: 280px;
  > * {
    flex: 1;
  }
  > input {
    border: none;
    border-bottom: 1px solid ${colors.borderGray};
    border-radius: 0;
    outline: 0;
    padding-top: 23px;
    text-align: center;
    height: 18px;
    max-width: 40px;
    margin-right: 15px;
    font-size: 14px;
    display: flex;
  }
`;
