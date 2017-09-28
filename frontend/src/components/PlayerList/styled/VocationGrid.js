import styled from 'styled-components';
import media from 'globals/media';

export default styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
  min-width: 280px;
  ${media.handheld`
    grid-template-columns: auto;
  `};
`;
