type LocalStorageMapType = {
  initial_setup: 'true';
};

export class LocalStorageService {
  private static _instance: LocalStorageService;

  private constructor() {}

  public static get Instance() {
    return this._instance || new LocalStorageService();
  }
  setValue<K extends keyof LocalStorageMapType>(
    key: K,
    value: LocalStorageMapType[K]
  ) {
    window.localStorage.setItem(key, value);
  }

  getValue<K extends keyof LocalStorageMapType>(
    key: K
  ): LocalStorageMapType[K] {
    const stringValue = localStorage.getItem(key)!;
    return this.safeJSONParser(stringValue) as LocalStorageMapType[K];
  }

  private safeJSONParser(stringValue: string) {
    try {
      return JSON.parse(stringValue);
    } catch (error) {
      return stringValue;
    }
  }
}
