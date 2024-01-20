import { createGlobalStyle, withTheme } from 'styled-components';
import { ThemeProps } from './themes';

type GlobalThemeProps = {
  theme: ThemeProps;
};

const globalStyle = createGlobalStyle`
  :root {
    //dark-mode
    --dark-background: rgb(30, 41, 59);
    --dark-text: rgb(255, 255, 255);

    //light-mode
    --light-background: rgb(255, 255, 255);
    --light-text: rgb(0, 0, 0);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body  {
    -webkit-font-smoothing: antialiased;
    font-family: 'Noto Sans', sans-serif;
    height: 100vh;
    width: 100vw;
    margin: 0 auto;
    background-color: ${({ theme }: GlobalThemeProps) => theme.background};
  }

  h1 {
    font-size: 2rem;
    color: ${({ theme }: GlobalThemeProps) => theme.text};
  }

`;

export default withTheme(globalStyle);
