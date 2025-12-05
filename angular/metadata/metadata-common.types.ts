type LangCode =
  | 'aa'
  | 'ab'
  | 'ae'
  | 'af'
  | 'ak'
  | 'am'
  | 'an'
  | 'ar'
  | 'as'
  | 'av'
  | 'ay'
  | 'az'
  | 'ba'
  | 'be'
  | 'bg'
  | 'bh'
  | 'bi'
  | 'bm'
  | 'bn'
  | 'bo'
  | 'br'
  | 'bs'
  | 'ca'
  | 'ce'
  | 'ch'
  | 'co'
  | 'cr'
  | 'cs'
  | 'cu'
  | 'cv'
  | 'cy'
  | 'da'
  | 'de'
  | 'dv'
  | 'dz'
  | 'ee'
  | 'el'
  | 'en'
  | 'eo'
  | 'es'
  | 'et'
  | 'eu'
  | 'fa'
  | 'ff'
  | 'fi'
  | 'fj'
  | 'fo'
  | 'fr'
  | 'fy'
  | 'ga'
  | 'gd'
  | 'gl'
  | 'gn'
  | 'gu'
  | 'gv'
  | 'ha'
  | 'he'
  | 'hi'
  | 'ho'
  | 'hr'
  | 'ht'
  | 'hu'
  | 'hy'
  | 'hz'
  | 'ia'
  | 'id'
  | 'ie'
  | 'ig'
  | 'ii'
  | 'ik'
  | 'io'
  | 'is'
  | 'it'
  | 'iu'
  | 'ja'
  | 'jv'
  | 'ka'
  | 'kg'
  | 'ki'
  | 'kj'
  | 'kk'
  | 'kl'
  | 'km'
  | 'kn'
  | 'ko'
  | 'kr'
  | 'ks'
  | 'ku'
  | 'kv'
  | 'kw'
  | 'ky'
  | 'la'
  | 'lb'
  | 'lg'
  | 'li'
  | 'ln'
  | 'lo'
  | 'lt'
  | 'lu'
  | 'lv'
  | 'mg'
  | 'mh'
  | 'mi'
  | 'mk'
  | 'ml'
  | 'mn'
  | 'mr'
  | 'ms'
  | 'mt'
  | 'my'
  | 'na'
  | 'nb'
  | 'nd'
  | 'ne'
  | 'ng'
  | 'nl'
  | 'nn'
  | 'no'
  | 'nr'
  | 'nv'
  | 'ny'
  | 'oc'
  | 'oj'
  | 'om'
  | 'or'
  | 'os'
  | 'pa'
  | 'pi'
  | 'pl'
  | 'ps'
  | 'pt'
  | 'qu'
  | 'rm'
  | 'rn'
  | 'ro'
  | 'ru'
  | 'rw'
  | 'sa'
  | 'sc'
  | 'sd'
  | 'se'
  | 'sg'
  | 'si'
  | 'sk'
  | 'sl'
  | 'sm'
  | 'sn'
  | 'so'
  | 'sq'
  | 'sr'
  | 'ss'
  | 'st'
  | 'su'
  | 'sv'
  | 'sw'
  | 'ta'
  | 'te'
  | 'tg'
  | 'th'
  | 'ti'
  | 'tk'
  | 'tl'
  | 'tn'
  | 'to'
  | 'tr'
  | 'ts'
  | 'tt'
  | 'tw'
  | 'ty'
  | 'ug'
  | 'uk'
  | 'ur'
  | 'uz'
  | 've'
  | 'vi'
  | 'vo'
  | 'wa'
  | 'wo'
  | 'xh'
  | 'yi'
  | 'yo'
  | 'za'
  | 'zh'
  | 'zu'
  | 'af-ZA'
  | 'am-ET'
  | 'ar-AE'
  | 'ar-BH'
  | 'ar-DZ'
  | 'ar-EG'
  | 'ar-IQ'
  | 'ar-JO'
  | 'ar-KW'
  | 'ar-LB'
  | 'ar-LY'
  | 'ar-MA'
  | 'arn-CL'
  | 'ar-OM'
  | 'ar-QA'
  | 'ar-SA'
  | 'ar-SD'
  | 'ar-SY'
  | 'ar-TN'
  | 'ar-YE'
  | 'as-IN'
  | 'az-az'
  | 'az-Cyrl-AZ'
  | 'az-Latn-AZ'
  | 'ba-RU'
  | 'be-BY'
  | 'bg-BG'
  | 'bn-BD'
  | 'bn-IN'
  | 'bo-CN'
  | 'br-FR'
  | 'bs-Cyrl-BA'
  | 'bs-Latn-BA'
  | 'ca-ES'
  | 'co-FR'
  | 'cs-CZ'
  | 'cy-GB'
  | 'da-DK'
  | 'de-AT'
  | 'de-CH'
  | 'de-DE'
  | 'de-LI'
  | 'de-LU'
  | 'dsb-DE'
  | 'dv-MV'
  | 'el-CY'
  | 'el-GR'
  | 'en-029'
  | 'en-AU'
  | 'en-BZ'
  | 'en-CA'
  | 'en-cb'
  | 'en-GB'
  | 'en-IE'
  | 'en-IN'
  | 'en-JM'
  | 'en-MT'
  | 'en-MY'
  | 'en-NZ'
  | 'en-PH'
  | 'en-SG'
  | 'en-TT'
  | 'en-US'
  | 'en-ZA'
  | 'en-ZW'
  | 'es-AR'
  | 'es-BO'
  | 'es-CL'
  | 'es-CO'
  | 'es-CR'
  | 'es-DO'
  | 'es-EC'
  | 'es-ES'
  | 'es-GT'
  | 'es-HN'
  | 'es-MX'
  | 'es-NI'
  | 'es-PA'
  | 'es-PE'
  | 'es-PR'
  | 'es-PY'
  | 'es-SV'
  | 'es-US'
  | 'es-UY'
  | 'es-VE'
  | 'et-EE'
  | 'eu-ES'
  | 'fa-IR'
  | 'fi-FI'
  | 'fil-PH'
  | 'fo-FO'
  | 'fr-BE'
  | 'fr-CA'
  | 'fr-CH'
  | 'fr-FR'
  | 'fr-LU'
  | 'fr-MC'
  | 'fy-NL'
  | 'ga-IE'
  | 'gd-GB'
  | 'gd-ie'
  | 'gl-ES'
  | 'gsw-FR'
  | 'gu-IN'
  | 'ha-Latn-NG'
  | 'he-IL'
  | 'hi-IN'
  | 'hr-BA'
  | 'hr-HR'
  | 'hsb-DE'
  | 'hu-HU'
  | 'hy-AM'
  | 'id-ID'
  | 'ig-NG'
  | 'ii-CN'
  | 'in-ID'
  | 'is-IS'
  | 'it-CH'
  | 'it-IT'
  | 'iu-Cans-CA'
  | 'iu-Latn-CA'
  | 'iw-IL'
  | 'ja-JP'
  | 'ka-GE'
  | 'kk-KZ'
  | 'kl-GL'
  | 'km-KH'
  | 'kn-IN'
  | 'kok-IN'
  | 'ko-KR'
  | 'ky-KG'
  | 'lb-LU'
  | 'lo-LA'
  | 'lt-LT'
  | 'lv-LV'
  | 'mi-NZ'
  | 'mk-MK'
  | 'ml-IN'
  | 'mn-MN'
  | 'mn-Mong-CN'
  | 'moh-CA'
  | 'mr-IN'
  | 'ms-BN'
  | 'ms-MY'
  | 'mt-MT'
  | 'nb-NO'
  | 'ne-NP'
  | 'nl-BE'
  | 'nl-NL'
  | 'nn-NO'
  | 'no-no'
  | 'nso-ZA'
  | 'oc-FR'
  | 'or-IN'
  | 'pa-IN'
  | 'pl-PL'
  | 'prs-AF'
  | 'ps-AF'
  | 'pt-BR'
  | 'pt-PT'
  | 'qut-GT'
  | 'quz-BO'
  | 'quz-EC'
  | 'quz-PE'
  | 'rm-CH'
  | 'ro-mo'
  | 'ro-RO'
  | 'ru-mo'
  | 'ru-RU'
  | 'rw-RW'
  | 'sah-RU'
  | 'sa-IN'
  | 'se-FI'
  | 'se-NO'
  | 'se-SE'
  | 'si-LK'
  | 'sk-SK'
  | 'sl-SI'
  | 'sma-NO'
  | 'sma-SE'
  | 'smj-NO'
  | 'smj-SE'
  | 'smn-FI'
  | 'sms-FI'
  | 'sq-AL'
  | 'sr-BA'
  | 'sr-CS'
  | 'sr-Cyrl-BA'
  | 'sr-Cyrl-CS'
  | 'sr-Cyrl-ME'
  | 'sr-Cyrl-RS'
  | 'sr-Latn-BA'
  | 'sr-Latn-CS'
  | 'sr-Latn-ME'
  | 'sr-Latn-RS'
  | 'sr-ME'
  | 'sr-RS'
  | 'sr-sp'
  | 'sv-FI'
  | 'sv-SE'
  | 'sw-KE'
  | 'syr-SY'
  | 'ta-IN'
  | 'te-IN'
  | 'tg-Cyrl-TJ'
  | 'th-TH'
  | 'tk-TM'
  | 'tlh-QS'
  | 'tn-ZA'
  | 'tr-TR'
  | 'tt-RU'
  | 'tzm-Latn-DZ'
  | 'ug-CN'
  | 'uk-UA'
  | 'ur-PK'
  | 'uz-Cyrl-UZ'
  | 'uz-Latn-UZ'
  | 'uz-uz'
  | 'vi-VN'
  | 'wo-SN'
  | 'xh-ZA'
  | 'yo-NG'
  | 'zh-CN'
  | 'zh-HK'
  | 'zh-MO'
  | 'zh-SG'
  | 'zh-TW'
  | 'zh-Hans'
  | 'zh-Hant'
  | 'zu-ZA'
  | `${Lowercase<string>}-${string}`;
type UnmatchedLang = 'x-default';
type HrefLang = LangCode | UnmatchedLang;
export type Languages<T> = {
  [s in HrefLang]?: T | undefined;
};
export type AbsoluteTemplateString = {
  absolute: string;
  template: string | null;
};
export type TemplateString = DefaultTemplateString | AbsoluteTemplateString | AbsoluteString;
export type DefaultTemplateString = {
  default: string;
  template: string;
};
export type AbsoluteString = {
  absolute: string;
};
export type Author = {
  url?: string | URL | undefined;
  name?: string | undefined;
};
export type ReferrerEnum =
  | 'no-referrer'
  | 'origin'
  | 'no-referrer-when-downgrade'
  | 'origin-when-cross-origin'
  | 'same-origin'
  | 'strict-origin'
  | 'strict-origin-when-cross-origin';
export type ColorSchemeEnum =
  | 'normal'
  | 'light'
  | 'dark'
  | 'light dark'
  | 'dark light'
  | 'only light';
export type ThemeColorDescriptor = {
  color: string;
  media?: string | undefined;
};

export type ViewportLayout = {
  width?: string | number | undefined;
  height?: string | number | undefined;
  initialScale?: number | undefined;
  minimumScale?: number | undefined;
  maximumScale?: number | undefined;
  userScalable?: boolean | undefined;
  viewportFit?: 'auto' | 'cover' | 'contain' | undefined;
  interactiveWidget?: 'resizes-visual' | 'resizes-content' | 'overlays-content' | undefined;
};
interface RobotsInfo {
  index?: boolean | undefined;
  follow?: boolean | undefined;
  noindex?: undefined;
  nofollow?: undefined;
  noarchive?: boolean | undefined;
  nosnippet?: boolean | undefined;
  noimageindex?: boolean | undefined;
  nocache?: boolean | undefined;
  notranslate?: boolean | undefined;
  indexifembedded?: boolean | undefined;
  nositelinkssearchbox?: boolean | undefined;
  unavailable_after?: string | undefined;
  'max-video-preview'?: number | string | undefined;
  'max-image-preview'?: 'none' | 'standard' | 'large' | undefined;
  'max-snippet'?: number | undefined;
}
export type Robots = RobotsInfo & {
  googleBot?: string | RobotsInfo | undefined;
};
export type ResolvedRobots = {
  basic: string | null;
  googleBot: string | null;
};
export type IconDescriptor = {
  url: string | URL;
  type?: string | undefined;
  sizes?: string | undefined;
  color?: string | undefined;
  /** defaults to rel="icon" unless superseded by Icons map */
  rel?: string | undefined;
  media?: string | undefined;
  /**
   * @see https://developer.mozilla.org/docs/Web/API/HTMLImageElement/fetchPriority
   */
  fetchPriority?: 'high' | 'low' | 'auto' | undefined;
};
export type AlternateLinkDescriptor = {
  title?: string | undefined;
  url: string | URL;
};
export type AlternateURLs = {
  canonical?: string | URL | AlternateLinkDescriptor | null | undefined;
  languages?: Languages<string | URL | AlternateLinkDescriptor[] | null> | undefined;
  media?:
    | {
        [p: string]: string | URL | AlternateLinkDescriptor[] | null;
      }
    | undefined;
  types?:
    | {
        [p: string]: string | URL | AlternateLinkDescriptor[] | null;
      }
    | undefined;
};
export type IconURL = string | URL;
export type Icon = IconURL | IconDescriptor;
export type Icons = {
  /** rel="icon" */
  icon?: Icon | Icon[] | undefined;
  /** rel="shortcut icon" */
  shortcut?: Icon | Icon[] | undefined;
  /**
   * @see https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
   * rel="apple-touch-icon"
   */
  apple?: Icon | Icon[] | undefined;
  /** rel inferred from descriptor, defaults to "icon" */
  other?: IconDescriptor | IconDescriptor[] | undefined;
};
export type Verification = {
  google?: null | string | number | (string | number)[] | undefined;
  yahoo?: null | string | number | (string | number)[] | undefined;
  yandex?: null | string | number | (string | number)[] | undefined;
  me?: null | string | number | (string | number)[] | undefined;
  other?:
    | {
        [name: string]: string | number | (string | number)[];
      }
    | undefined;
};
export type FormatDetection = {
  telephone?: boolean | undefined;
  date?: boolean | undefined;
  address?: boolean | undefined;
  email?: boolean | undefined;
  url?: boolean | undefined;
};
export type AppLinks = {
  ios?: AppLinksApple | Array<AppLinksApple> | undefined;
  iphone?: AppLinksApple | Array<AppLinksApple> | undefined;
  ipad?: AppLinksApple | Array<AppLinksApple> | undefined;
  android?: AppLinksAndroid | Array<AppLinksAndroid> | undefined;
  windows_phone?: AppLinksWindows | Array<AppLinksWindows> | undefined;
  windows?: AppLinksWindows | Array<AppLinksWindows> | undefined;
  windows_universal?: AppLinksWindows | Array<AppLinksWindows> | undefined;
  web?: AppLinksWeb | Array<AppLinksWeb> | undefined;
};
export type ResolvedAppLinks = {
  ios?: Array<AppLinksApple> | undefined;
  iphone?: Array<AppLinksApple> | undefined;
  ipad?: Array<AppLinksApple> | undefined;
  android?: Array<AppLinksAndroid> | undefined;
  windows_phone?: Array<AppLinksWindows> | undefined;
  windows?: Array<AppLinksWindows> | undefined;
  windows_universal?: Array<AppLinksWindows> | undefined;
  web?: Array<AppLinksWeb> | undefined;
};
export type AppLinksApple = {
  url: string | URL;
  app_store_id?: string | number | undefined;
  app_name?: string | undefined;
};
export type AppLinksAndroid = {
  package: string;
  url?: string | URL | undefined;
  class?: string | undefined;
  app_name?: string | undefined;
};
export type AppLinksWindows = {
  url: string | URL;
  app_id?: string | undefined;
  app_name?: string | undefined;
};
export type AppLinksWeb = {
  url: string | URL;
  should_fallback?: boolean | undefined;
};
