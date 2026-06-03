import { CreateSignalOptions, WritableSignal } from '@angular/core';

declare module '@angular/core' {
  interface CreateSignal {
    <T>(): WritableSignal<T | undefined>;

    <T>(value: T): WritableSignal<T>;

    <T>(value: T, options?: CreateSignalOptions<T>): WritableSignal<T>;
  }

  declare const signal: CreateSignal;
}

// then add types to tsconfig.app.ts

{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": ["src/global.d.ts"] // add this
  },
  "include": [
    "src/**/*.ts",
  ],
  "exclude": [
    "src/**/*.spec.ts"
  ]
}
