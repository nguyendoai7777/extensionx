export type Facebook = FacebookAppId | FacebookAdmins;
export type FacebookAppId = {
  appId: string;
  admins?: never | undefined;
};
export type FacebookAdmins = {
  appId?: never | undefined;
  admins: string | string[];
};
export type ResolvedFacebook = {
  appId?: string | undefined;
  admins?: string[] | undefined;
};
