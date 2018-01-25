import styled from 'styled-components';
import colors from 'globals/colors';

export const Player = styled.div.attrs({
  title: ({promoted}) => (promoted ? undefined : 'Not promoted')
})`
  display: grid;
  grid-template-columns: 15px 1fr 20px;
  grid-gap: 5px;
  padding: 4px;
  border-radius: 2px;
  margin-bottom: 2px;
  font-size: 11px;
  align-items: center;
  background-color: ${props => (props.sharable ? colors.highlightGreen : 'inherit')};
  a {
    color: ${colors.link};
    :hover {
      text-decoration: underline;
    }
  }
  button {
    background: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    outline: none;
    fill: hsla(0, 0%, 30%, 1);
    :hover {
      fill: hsla(0, 0%, 0%, 1);
    }
  }
`;

export const VocationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  grid-column-gap: 20px;
`;

export const StyledList = styled.div`
  display: ${({hide}) => (hide ? 'none' : 'block')};
`;
export const FullWidth = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  animation-duration: 1.8s;
  animation-name: fadeInOut;
  animation-fill-mode: forwards;
  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export const ListWrapper = styled.div`
  display: ${({hide}) => (hide ? 'none' : 'block')};
  order: ${({minimized}) => (minimized ? '1' : '0')};
  position: relative;
  :after {
    content: ${({minimized}) => (minimized ? "'[hidden]'" : '')};
    font-size: 8px;
    position: absolute;
    left: 0;
    top: 2px;
  }
  h4 {
    cursor: pointer;
    user-select: none;
    color: ${({minimized}) => (minimized ? '#b5b5b5' : 'inherit')};
  }
`;
