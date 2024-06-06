export type NullableKeys<T extends {}> = {
  [key in keyof T]: T[key] | null;
};
