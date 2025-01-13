export type PickNullable<T> = {
  [P in keyof T as null extends T[P] ? P : never]: T[P];
};

export type PickNotNullable<T> = {
  [P in keyof T as null extends T[P] ? never : P]: T[P];
};

export type OptionalNullable<T> = {
  [K in keyof PickNullable<T>]?: Exclude<T[K], null>;
} & {
  [K in keyof PickNotNullable<T>]: T[K];
};

type FilterConditions<T> = {
  [Property in keyof T]?: T[Property];
};

export interface PaginationOptions {
  page: number; // Page number
  pageSize: number; // Number of items per page
}

type CursorPagination = {
  id: number;
};

export type SortValue = "asc" | "desc";
export type SortOptions<T> = {
  [Property in keyof T]?: SortValue;
};

export type ApiQueryParams<T> = {
  filter: FilterConditions<T>;
  sort?: SortOptions<T>;
};

export interface Identifiable {
  id: number;
}

export type ApiPaginationQueryResponse<T extends object> = {
  data: T[];
  totalRecords: number;
};
export type ApiPaginationQueryParams<
  T extends object = object,
  S extends object = object,
> = {
  filter: FilterConditions<T>;
  pagination: PaginationOptions;
  sort?: SortOptions<S>;
  cursorPagination?: CursorPagination;
};

type ShouldCastToString = number | bigint | boolean;

export type CastQueryFieldsToStrings<T> =
  T extends Array<infer U> // Check if it's an array
    ? Array<CastQueryFieldsToStrings<U>> // Apply recursively to array elements
    : T extends object // Check if it's an object
      ? {
          [P in keyof T]: T[P] extends ShouldCastToString // Check if the property is a number
            ? string // Convert number to string
            : T[P] extends ShouldCastToString | undefined // Check if the property is an optional number
              ? string | undefined // Convert optional number to optional string
              : CastQueryFieldsToStrings<T[P]>; // Apply recursively to other properties
        }
      : T; // Return the type unchanged if it's not an object or array

export type CastDateFieldsToIsoDate<T> =
  T extends Array<infer U> // Check if it's an array
    ? Array<CastDateFieldsToIsoDate<U>> // Apply recursively to array elements
    : T extends object // Check if it's an object
      ? {
          [P in keyof T]: T[P] extends Date // Check if the property is a date
            ? ISO_8601_DateString // Convert date to string
            : T[P] extends Date | undefined // Check if the property is an optional date
              ? ISO_8601_DateString | undefined // Convert optional date to optional string
              : CastDateFieldsToIsoDate<T[P]>; // Apply recursively to other properties
        }
      : T; // Return the type unchanged if it's not an object or array

export type ISO_8601_DateString = string;

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type Locale = "ar" | "en";

export type CastValues<T extends object, V> = {
  [K in keyof T]: V;
};
