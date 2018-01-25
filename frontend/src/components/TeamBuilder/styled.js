import styled from 'styled-components';
import colors from 'globals/colors';

export const PlayerInput = styled.div`
  display: flex;
  width: 280px;
  justify-content: center;
  align-items: center;
  margin: 20px auto 0 auto;
  > form {
    flex: 1;
  }
  > input {
    width: 50px;
    border: none;
    border-bottom: 1px solid ${colors.borderGray};
    border-radius: 0;
    outline: 0;
    text-align: center;
    background: transparent;
    margin-right: 15px;
    font-size: 14px;
    display: flex;
  }
`;
