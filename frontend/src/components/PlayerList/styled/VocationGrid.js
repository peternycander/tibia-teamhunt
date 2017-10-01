import styled from 'styled-components';
import media from 'globals/media';

export default styled.div`
  display: flex;
  min-width: 280px;
  justify-content: space-evenly;
  width: 60%;
  ${media.handheld`
    grid-template-columns: auto;
  `};
`;
