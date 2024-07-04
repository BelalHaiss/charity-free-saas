export function extractFields<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
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

export function removeFields<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const filteredObj: Partial<T> = { ...obj };
  for (const key of keys) {
    delete filteredObj[key];
  }
  return filteredObj as Omit<T, K>;
}

export const isObject = (x: object) =>
  typeof x === "object" && !Array.isArray(x) && x !== null;
