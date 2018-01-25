import styled from 'styled-components';
import colors from 'globals/colors';

export const Player = styled.div.attrs({
  title: ({promoted}) => (promoted ? undefined : 'Not promoted')
})`
  display: flex;
  justify-content: space-between;
  padding: 4px;
  padding-left: ${({promoted}) => (promoted ? '4px' : '20px')};
  border-radius: 2px;
  margin-bottom: 2px;
  font-size: 11px;
  background-color: ${props => (props.sharable ? colors.highlightGreen : 'inherit')};
  position: relative;
  :after {
    display: ${({promoted}) => (promoted ? 'none' : 'flex')};
    content: '💔';
    align-items: center;
    font-size: 10px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 2px;
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
