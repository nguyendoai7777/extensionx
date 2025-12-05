import { AppleWebApp, ItunesApp } from './apple.types';
import { Facebook } from './facebook.type';
import {
  AlternateURLs,
  AppLinks,
  Author,
  ColorSchemeEnum,
  FormatDetection,
  Icon,
  Icons,
  IconURL,
  ReferrerEnum,
  Robots,
  TemplateString,
  ThemeColorDescriptor,
  Verification,
  ViewportLayout,
} from './metadata-common.types';
import { OpenGraph } from './open-graph.types';
import { Pinterest } from './printerest.types';
import { Twitter } from './twitter.types';

export interface Metadata {
  metadataBase?: URL | null | undefined;
  title?: string | TemplateString | null | undefined;
  description?: string | null | undefined;
  applicationName?: string | null | undefined;
  authors?: Author | Array<Author> | null | undefined;
  generator?: string | null | undefined;
  keywords?: string | Array<string> | null | undefined;
  referrer?: ReferrerEnum | null | undefined;
  themeColor?: string | ThemeColorDescriptor | ThemeColorDescriptor[] | null | undefined;
  colorScheme?: ColorSchemeEnum | null | undefined;
  viewport?: string | ViewportLayout | null | undefined;
  creator?: string | null | undefined;
  publisher?: string | null | undefined;
  robots?: string | Robots | null | undefined;
  alternates?: AlternateURLs | null | undefined;
  icons?: IconURL | Array<Icon> | Icons | null | undefined;
  manifest?: string | URL | null | undefined;
  openGraph?: OpenGraph | null | undefined;
  twitter?: Twitter | null | undefined;
  facebook?: Facebook | null | undefined;
  pinterest?: Pinterest | null;
  verification?: Verification | undefined;
  appleWebApp?: boolean | AppleWebApp | null | undefined;
  formatDetection?: FormatDetection | null | undefined;
  itunes?: ItunesApp | null | undefined;
  abstract?: string | null | undefined;
  appLinks?: AppLinks | null | undefined;
  archives?: string | Array<string> | null | undefined;
  assets?: string | Array<string> | null | undefined;
  bookmarks?: string | Array<string> | null | undefined;
  pagination?: {
    previous?: string | URL | null | undefined;
    next?: string | URL | null | undefined;
  };
  category?: string | null | undefined;
  classification?: string | null | undefined;
  other?:
    | {
        [p: string]: string | number | Array<string | number>;
      }
    | undefined;
}
