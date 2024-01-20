import { useEffect, useState } from 'react'

type Mode = "light" | "dark" | "auto"

export const useThemeMode = () => {
  const [theme, setTheme] = useState<Mode>('auto');

  const setMode = (mode: Mode) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const themeToggler = () => (theme === 'dark' ? setMode('light') : setMode('dark'));

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme') || 'auto'
    localTheme && setTheme(localTheme as Mode);
  }, []);

  return { theme, themeToggler };
};

export default useThemeMode;
