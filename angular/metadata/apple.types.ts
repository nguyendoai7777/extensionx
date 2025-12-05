export type AppleImage = string | AppleImageDescriptor;
export type AppleImageDescriptor = {
  url: string;
  media?: string | undefined;
};
export type AppleWebApp = {
  capable?: boolean | undefined;
  title?: string | undefined;
  startupImage?: AppleImage | Array<AppleImage> | undefined;
  statusBarStyle?: 'default' | 'black' | 'black-translucent' | undefined;
};

export type ItunesApp = {
  appId: string;
  appArgument?: string | undefined;
};
