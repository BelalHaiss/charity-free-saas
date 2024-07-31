export type NullableKeys<
  T extends object,
  IgnoredKeys extends keyof T = never,
> = {
  [key in keyof T]: key extends IgnoredKeys ? T[key] : T[key] | null;
};
