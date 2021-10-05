import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
  --primary-color: #161616;
  --secondary-color: #606060;

  background-color: var(--primary-color);

}
`;

export default GlobalStyles;
