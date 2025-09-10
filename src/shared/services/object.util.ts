export declare type Nullable<T = void> = T | null | undefined;

export const nonNullableArray = <T>(arr: Nullable<T>[]): T[] =>
  arr.filter((item) => item !== null && item !== undefined) as T[];

export function extractFields<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const pickedObj: Pick<T, K> = {} as Pick<T, K>;
  for (const key of keys) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      pickedObj[key] = obj[key];
    }
  }
  return pickedObj;
}

export function removeUndefinedValues<T extends object>(obj: T): T {
  const objectWithoutUndefined: T = {} as T;

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'undefined') continue;
    objectWithoutUndefined[key as keyof T] = value;
  }

  return objectWithoutUndefined;
}

export function removeFields<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const filteredObj: Partial<T> = structuredClone(obj);
  for (const key of keys) {
    delete filteredObj[key];
  }
  return filteredObj as Omit<T, K>;
}

export function addArrayItemIfNotIncluded<T>(
  array: T[],
  newItem: T,
  optionalFindFunction?: (_: T) => boolean
): T[] {
  // Check if the new item is already included in the array
  const itemExists = optionalFindFunction
    ? array.some(optionalFindFunction)
    : array.includes(newItem);

  // If the item doesn't exist, add it to the array
  if (!itemExists) {
    return [...array, newItem]; // Return a new array with the new item added
  }

  // If the item exists, return the original array
  return array;
}

export function arrayHasMatches(array1: string[], array2: string[]): boolean {
  return array1.some((item) => array2.includes(item));
}

export const mapObjectArrayToItemArray = <T extends object, K extends keyof T>(
  array: T[],
  key: K
): T[K][] => array.map((obj) => obj[key]);

const casters = {
  toNumber: (value: unknown) => Number(value),
  toString: (value: unknown) => String(value),
  toBoolean: (value: unknown) => Boolean(value),
  toUpperCase: (value: unknown) => String(value).toUpperCase()
};

type CasterMethods = keyof typeof casters;

type CasterReturnType<T extends CasterMethods> = T extends 'toNumber'
  ? number
  : T extends 'toString'
    ? string
    : T extends 'toBoolean'
      ? boolean
      : T extends 'toUpperCase'
        ? string
        : never;

export function optionalCast<T extends CasterMethods>(
  value: unknown,
  caster: T
): CasterReturnType<T> | undefined {
  return value !== undefined
    ? (casters[caster](value) as CasterReturnType<T>)
    : undefined;
}

export function removeNullOrUndefinedFromObject(obj: object): object {
  // Create a copy of the object to avoid mutating the original
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      // If the value is an object, recursively process it
      if (typeof value === 'object' && !Array.isArray(value)) {
        const cleanedValue = removeNullOrUndefinedFromObject(value);
        // Only add the key if the nested object has keys left after cleaning
        if (Object.keys(cleanedValue).length > 0) {
          acc[key] = cleanedValue;
        }
      } else {
        acc[key] = value;
      }
    }
    return acc;
  }, {} as object);
}

// Example usage:
const input = {
  a: 1,
  b: null,
  c: undefined,
  d: {
    e: 2,
    f: null,
    g: {
      h: undefined,
      i: 3
    }
  },
  j: [],
  k: {
    l: null
  }
};
