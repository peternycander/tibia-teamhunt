import {css} from 'styled-components';

export default {
  handheld: (...args) => css`@media (max-width: 420px) {${css(...args)};}`
};
