import { CSSProperties } from "vue";

export type NullableKeys<
  T extends object,
  IgnoredKeys extends keyof T = never,
> = {
  [key in keyof T]: key extends IgnoredKeys ? T[key] : T[key] | null;
};

export type TableHeader = { label: string; styles?: CSSProperties };

export type WithTempId<T> = T & { tempId: string | number };
