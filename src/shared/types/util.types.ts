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

interface PaginationOptions {
  page: number; // Page number
  pageSize: number; // Number of items per page
}

type CursorPagination = {
  id: number;
};
type SortOptions<T> = {
  [Property in keyof T]?: "asc" | "desc";
};

export type ApiQueryParams<T> = {
  filter: FilterConditions<T>;
  sort?: SortOptions<T>;
};

export type ApiPaginationQueryParams<T> = {
  filter: FilterConditions<T>;
  pagination: PaginationOptions;
  sort?: SortOptions<T>;
  cursorPagination?: CursorPagination;
};
