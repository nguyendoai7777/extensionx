const SystemThemeMode = {
  dark: 'dark',
  light: 'light',
} as const;

type SystemTheme = keyof typeof SystemThemeMode;

export function useSystemThemeContext() {
  const isDarkMode = matchMedia('(prefers-color-scheme: dark)').matches;

  function listenChange(theme: (theme: SystemTheme) => void) {
    matchMedia('(prefers-color-scheme: dark)').addEventListener(
      'change',
      (event) => {
        const newColorScheme = event.matches
          ? 'dark'
          : ('light' as SystemTheme);
        theme(newColorScheme);
      },
    );
  }

  return {
    isDarkMode,
    listenThemeChange: (onSystemChange: (theme: SystemTheme) => void) => {
      listenChange(onSystemChange);
    },
  };
}
