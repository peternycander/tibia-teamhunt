import styled from 'styled-components';
import colors from 'globals/colors';

export const PlayerInput = styled.div`
  display: flex;
  width: 200px;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto 0 auto;
  > form {
    flex: 1;
  }
  > input {
    width: 80px;
    border: none;
    border-radius: 5px;
    outline: 0;
    text-align: left;
    padding: 10px;
    background: ${colors.backgroundGray};
    font-size: 14px;
    display: flex;
  }
`;
