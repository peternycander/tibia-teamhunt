import styled from 'styled-components';
import media from 'globals/media';
import colors from 'globals/colors';

export const Sidebar = styled.div`
  grid-area: sidebar;
  padding-left: 1rem;
  margin-right: 1rem;
  max-width: 20rem;
  ${media.smallDesktop`
  display: none;
  `};
  background: ${colors.sidebar};
  ul {
    padding: 0;
  }
  li {
    list-style: none;
    margin-bottom: 5px;
  }
`;

export const Body = styled.div`
  grid-area: body;
`;

export const AppWrapper = styled.div`
  display: grid;
  margin-right: 5vw;
  min-height: 100vh;
  grid-template-areas:
    'sidebar header header header header header'
    'sidebar body body body body body';
  grid-template-rows: 12vh auto auto;
  ${media.smallDesktop`
  margin-left: 5vw;  
  grid-template-areas:
    'header header header header header'
    'body body body body body';
  `};
`;

export const SubHeader = styled.h3`
  text-align: center;
`;

export const FeedbackHint = styled.div`
  font-size: 10px;
  font-style: italic;
`;
