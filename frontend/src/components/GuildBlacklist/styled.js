import styled from 'styled-components';
import media from 'globals/media';
import colors from 'globals/colors';

export const Wrapper = styled.div`
  grid-area: sidebar;
  padding-left: 1rem;
  margin-right: 1rem;
  max-width: 20rem;
  ${media.smallDesktop`
  display: none;
  `};
  background: ${colors.sidebar};
`;

export const Guild = styled.div`
  margin-bottom: 5px;
`;
