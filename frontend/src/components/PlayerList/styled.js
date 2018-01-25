import styled from 'styled-components';
import colors from 'globals/colors';

export const Player = styled.div.attrs({
  title: ({promoted}) => (promoted ? undefined : 'Not promoted')
})`
  display: grid;
  grid-template-columns: 15px 1fr 20px;
  padding: 4px;
  border-radius: 2px;
  margin-bottom: 2px;
  font-size: 11px;
  align-items: center;
  background-color: ${props => (props.sharable ? colors.highlightGreen : 'inherit')};
  span:first-child {
    grid-column: ${({promoted}) => (promoted ? 'span 2' : 'auto')};
  }
  :after {
    display: ${({promoted}) => (promoted ? 'none' : 'block')};
    content: '💔';
    order: -1;
    font-size: 9px;
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
