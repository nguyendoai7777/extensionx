const SystemThemeMode = {
  dark: 'dark',
  light: 'light',
} as const;

type SystemTheme = keyof typeof SystemThemeMode;

type ThemeChangeCallback = (theme: SystemTheme) => void;

interface SystemThemeContext {
  isDarkMode: boolean;
  listenThemeChange: (changes: ThemeChangeCallback) => void;
}

/**
 *
 * @example
 * ```ts
 * Component({...})
 * export class ExampleComponent {
 *   systemTheme = useSystemThemeContext();
 *
 *   ngOnInit() {
 *     const { isDarkMode, listenThemeChange } = systemTheme;
 *     listenThemeChange((theme) => {
 *       console.log(`{} current theme: `, theme);
 *     });
 *   }
 * }
 * ```
 * ---
 * >>
 */
export function useSystemThemeContext(): SystemThemeContext {
  const isDarkMode = matchMedia('(prefers-color-scheme: dark)').matches;

  function listenChange(theme: ThemeChangeCallback) {
    matchMedia('(prefers-color-scheme: dark)').addEventListener(
      'change',
      (event) => {
        const newColorScheme = event.matches ? 'dark' : 'light';
        theme(newColorScheme);
      },
    );
  }

  return {
    isDarkMode,
    listenThemeChange: (onSystemChange) => {
      listenChange(onSystemChange);
    },
  };
}
