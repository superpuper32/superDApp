import { ConnectKitButton, ConnectKitProvider } from 'connectkit'
import { ThemeProvider } from 'styled-components'
import { Outlet } from 'react-router-dom';

import useThemeMode from '../hooks/useThemeMode'
import { lightTheme, darkTheme } from '../styles/themes'
import GlobalStyle from '../styles/global'

import { StyledHeader } from '../components/Header/header.styled'
import { StyledFlex } from '../components/styles/Flex.styled'
import TogglerButton from '../components/TogglerButton'

const Root = () => {
    const { theme, themeToggler } = useThemeMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    return (
      <ThemeProvider theme={themeMode}>
        <ConnectKitProvider debugMode mode={theme}>
            <GlobalStyle />

            <StyledHeader>
            <StyledFlex>
                <TogglerButton themeToggler={themeToggler} />
                <ConnectKitButton />
            </StyledFlex>
            </StyledHeader>

            <Outlet />

        </ConnectKitProvider>
      </ThemeProvider>
    )
}

export default Root;
