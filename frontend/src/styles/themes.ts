export interface ThemeProps {
  background: string;
  background_form: string;
  background_input: string;
  text: string;
}

export const darkTheme: ThemeProps = {
  background: 'var(--dark-background)',
  background_input: 'var(--dark-background_input)',
  background_form: 'var(--dark-background_form)',
  text: 'var(--dark-text)',
};

export const lightTheme: ThemeProps = {
  background: 'var(--light-background)',
  background_input: 'var(--light-background_input)',
  background_form: 'var(--light-background_form)',
  text: 'var(--light-text)',
};