export function extractFields<T extends {}, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const pickedObj: Pick<T, K> = {} as Pick<T, K>;
  for (const key of keys) {
    if (obj.hasOwnProperty(key)) {
      pickedObj[key] = obj[key];
    }
  }
  return pickedObj;
}

export function removeFields<T extends {}, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const filteredObj: Partial<T> = { ...obj };
  for (const key of keys) {
    delete filteredObj[key];
  }
  return filteredObj as Omit<T, K>;
}

const isObject = (x: any) =>
  typeof x === "object" && !Array.isArray(x) && x !== null;
