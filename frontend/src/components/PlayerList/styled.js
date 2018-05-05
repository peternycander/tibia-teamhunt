import styled from 'styled-components';
import colors from 'globals/colors';

export const Player = styled.div.attrs({
  'data-hint': ({blacklisted, promoted}) => {
    if (blacklisted) {
      return 'Blacklisted';
    }
    return promoted ? '' : 'Not promoted';
  }
})`
  display: grid;
  grid-template-columns: 15px 1fr 20px;
  grid-gap: 5px;
  padding: 4px;
  border-radius: 2px;
  margin-bottom: 2px;
  font-size: 11px;
  min-height: 24px;
  align-items: center;
  position: relative;
  color: ${props => (props.blacklisted ? colors.backgroundGray : 'inherit')};
  a {
    color: ${props => (props.blacklisted ? colors.backgroundGray : 'inherit')};
  }
  svg {
    fill: ${props => (props.blacklisted ? colors.backgroundGray : 'inherit')};
  }
  background-color: ${props => {
    if (props.blacklisted) {
      return colors.red;
    }
    return props.sharable ? colors.highlightGreen : 'inherit';
  }};
  @media (hover: hover) {
    :hover {
      :after,
      :before {
        animation-duration: 3s;
        animation-name: fadeInOut;
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          15% {
            transform: translateY(8px);
            opacity: 0;
          }
          30% {
            transform: translateY(0px);
            opacity: 1;
          }
          90% {
            transform: translateY(0px);
            opacity: 1;
          }
          100% {
            transform: translateY(0px);
            opacity: 0;
          }
      }
    }
  }
  :before,
  :after {
    opacity: 0;
    top: 100%;
    z-index: 2;
    position: absolute;
    transform: translateY(8px);
    pointer-events: none;
    display: ${({promoted, blacklisted}) =>
      promoted && !blacklisted ? 'none' : 'block'}
  }
  :before {
    content: '';
    background: transparent;
    border: 5px solid transparent;
    border-bottom-color: hsla(0, 0%, 7%, 1);
    left: 35px;
    margin-top: -9px;
  }
  :after {
    border-radius: 3px;
    left: 25px;
    content: attr(data-hint);
    background: hsla(0, 0%, 7%, 1);
    color: white;
    padding: 4px 5px;
    font-size: 10px;
    line-height: 12px;
    white-space: nowrap;
  }
`;

export const PlayerName = styled.a`
  color: ${colors.link};
  display: flex;
  align-items: center;
  :hover {
    text-decoration: underline;
  }
  svg {
    width: 11px;
    height: 11px;
    fill: ${colors.link};
    margin-right: 5px;
  }
`;

export const CopyButton = styled.button`
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
  svg {
    width: 11px;
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
