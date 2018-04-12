import styled from 'styled-components';
import colors from 'globals/colors';

export const Wrapper = styled.div`
  display: flex;
  width: 200px;
  justify-content: center;
  align-items: center;
  margin: 20px auto 0 auto;
  > form {
    flex: 1;
  }
`;

export const ReloadButton = styled.button`
  width: 50px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;
  &:focus {
    fill: ${colors.theme};
  }
  &:hover {
    transform: scale(1.05);
  }
  svg {
    width: 15px;
    height: auto;
  }
`;
