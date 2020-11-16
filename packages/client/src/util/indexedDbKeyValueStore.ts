/**
 * Adapted from https://github.com/elias551/simple-kvs
 * - Adds timestamp field and garbage collection feature.
 */
const getIndexedDbObject = () =>
  customDbFactory ||
  (window &&
    (window.indexedDB ||
      (window as any).mozIndexedDB ||
      (window as any).webkitIndexedDB ||
      (window as any).msIndexedDB));

let customDbFactory: IDBFactory | undefined;
export const setIndexedDb = (indexedDb: IDBFactory) => {
  customDbFactory = indexedDb;
};

const getKeyValueDb = (dbName: string, tableName: string) =>
  new Promise<IDBDatabase>((resolve, reject) => {
    const indexedDB = getIndexedDbObject();

    if (!indexedDB) {
      reject("indexedDB not supported");
      return;
    }

    const request = indexedDB.open(dbName, 1);
    request.onsuccess = function () {
      resolve(this.result);
    };

    request.onerror = function (event) {
      reject("indexedDB request error");
      console.error(event);
    };

    request.onupgradeneeded = function () {
      const store = this.result.createObjectStore(tableName, {
        keyPath: "k",
      });

      store.createIndex("t", "t", { unique: false });

      store.transaction.oncomplete = function () {
        resolve(this.db);
      };
    };
  });

export const removeKeyValueStore = (dbName: string) =>
  new Promise<void>((resolve, reject) => {
    const indexedDB = getIndexedDbObject();
    const request = indexedDB.deleteDatabase(dbName);
    request.onerror = reject;
    request.onsuccess = () => resolve();
  });

export const getKeyValueStore = async (
  dbName: string = "kv-store",
  tableName: string = "kv-store",
  maxAge?: number
): Promise<KeyValueStore> => {
  const db = await getKeyValueDb(dbName, tableName);

  const getStore = (mode: "readonly" | "readwrite") => db.transaction(tableName, mode).objectStore(tableName);

  const garbageCollect = () =>
    new Promise((resolve, reject) => {
      const request = getStore("readwrite")
        .index("t")
        .openCursor(IDBKeyRange.upperBound(Date.now() - maxAge!));

      request.onsuccess = (event) => {
        // @ts-ignore
        const cursor = event.target!.result;
        if (cursor) {
          getStore("readwrite").delete(cursor.primaryKey);
          cursor.continue();
        } else {
          resolve();
        }
      };
      request.onerror = reject;
    });
  if (maxAge) setInterval(garbageCollect, 60000);

  const store: KeyValueStore = {
    get: <T>(key: string) =>
      new Promise<T | undefined>((resolve, reject) => {
        const request = getStore("readonly").get(key);
        request.onerror = reject;
        request.onsuccess = function () {
          let result = this.result?.v;
          resolve(typeof result !== "undefined" ? (result as T) : undefined);
        };
      }),
    getKeys: () =>
      new Promise((resolve, reject) => {
        const request = getStore("readonly").getAllKeys();
        request.onerror = reject;
        request.onsuccess = function () {
          const keys = this.result.map((v) => v.toString());
          resolve(keys);
        };
      }),
    set: (key: string, value: any) =>
      new Promise<void>((resolve, reject) => {
        const request = getStore("readwrite").put({ k: key, v: value, t: Date.now() });
        request.onsuccess = () => resolve();
        request.onerror = reject;
      }),
    remove: (key: string) =>
      new Promise((resolve, reject) => {
        const request = getStore("readwrite").delete(key);
        request.onsuccess = () => resolve();
        request.onerror = reject;
      }),
    clear: () =>
      new Promise((resolve, reject) => {
        const request = getStore("readwrite").clear();
        request.onsuccess = () => resolve();
        request.onerror = reject;
      }),
  };
  return store;
};

export interface KeyValueStore {
  get: <T>(key: string) => Promise<T | undefined>;
  getKeys: () => Promise<string[]>;
  set: (key: string, value: any) => Promise<void>;
  remove: (key: string) => Promise<void>;
  clear: () => Promise<void>;
}
