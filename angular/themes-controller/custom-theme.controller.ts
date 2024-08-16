import { DOCUMENT } from '@angular/common';
import { Renderer2, inject } from '@angular/core';

interface ThemeConText {
  defaultTheme: string | null;
  bindingAttrName: string;
  appendTo: string;
}

type CustomThemeConfig = Partial<ThemeConText>;

/**
 *
 * @example
 * ```ts
 * Component({...})
 * export class ExampleComponent {
 *   setTheme = useCustomThemeContext({
 *     defaultTheme: localStorage.getItem('theme'),
 *     appendTo: 'body',
 *     bindingAttrName: 'app-theme',
 *   });
 * }
 * ```
 * ---
 * >>
 *
 * ```html
 * <div (click)="setTheme('pink')">Set Pink</div>
 * <div (click)="setTheme('purple')">Set Purple</div>
 * ```
 */
export function useCustomThemeContext(config?: Partial<CustomThemeConfig>) {
  const doc = inject(DOCUMENT);
  const rd2 = inject(Renderer2);
  const setTheme = (theme: string) => {
    rd2.setAttribute(
      doc.querySelector(config?.appendTo ?? 'html')!,
      config?.bindingAttrName ?? 'theme',
      theme ?? config?.defaultTheme,
    );
  };
  if (config?.defaultTheme) {
    setTheme(config.defaultTheme);
  }
  return (theme: string) => {
    setTheme(theme);
  };
}
