export type NullableKeys<T extends object> = {
  [key in keyof T]: T[key] | null;
};
