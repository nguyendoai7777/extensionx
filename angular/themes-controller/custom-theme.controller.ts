import { DOCUMENT } from '@angular/common';
import {
  ElementRef,
  Renderer2,
  assertInInjectionContext,
  inject,
} from '@angular/core';

interface ThemeConText {
  defaultTheme: string;
  bindingAttrName: string;
  appendTo: string;
}

type CustomThemeConfig = Partial<ThemeConText>;

interface CustomTheme {
  set: (theme: string) => void;
}

export function useCustomThemeContext(
  config?: Partial<CustomThemeConfig>,
): CustomTheme {
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
  return {
    set: (theme) => {
      setTheme(theme);
    },
  };
}
