import { createGlobalStyle, withTheme } from 'styled-components';
import { ThemeProps } from './themes';

type GlobalThemeProps = {
  theme: ThemeProps;
};

const globalStyle = createGlobalStyle`
  :root {
    //dark-mode
    --dark-background: color(display-p3 0.2 0.2 0.2); // color(display-p3 0.25098039215686274 0.25098039215686274 0.25098039215686274) )
    --dark-background_form: color(display-p3 0.501961 0.501961 0.501961);
    --dark-background_input: color(display-p3 0.219608 0.219608 0.219608);
    --dark-text: color(display-p3 1 1 1); // color(display-p3 0.501961 0.501961 0.501961)

    //light-mode
    --light-background: rgb(255, 255, 255);
    /* --light-background_form: color(display-p3 0.25098039215686274 0.25098039215686274 0.25098039215686274); */
    --light-background_form: rgb(255, 255, 255);
    --light-background_input: color(display-p3 0.964706 0.968627 0.976471);
    --light-text: color(display-p3 0.215686 0.215686 0.215686);
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
