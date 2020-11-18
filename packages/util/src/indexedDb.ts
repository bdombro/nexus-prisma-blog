export const indexedDB =
  window &&
  (window.indexedDB ||
    (window as any).mozIndexedDB ||
    (window as any).webkitIndexedDB ||
    (window as any).msIndexedDB);

export const indexedDBSupported = !!indexedDB;

/**
 * Class to make Indexed Database's easy for Key-Value Stores
 *
 * In addition to wrapping IDB, it also adds a feature for maxAge,
 * which can discard records if createdAt + maxAge > now
 *
 * Inspired by https://github.com/elias551/simple-kvs
 */
export class KeyValueStore {
  config: KeyValueStoreConfig = {
    dbName: 'kv',
    tableName: 'default',
    maxAge: -1,
  };
  db: IDBDatabase | undefined;
  inMemoryStore: IDBObjectStore | undefined;

  constructor(config: Partial<KeyValueStoreConfig>) {
    this.config = { ...this.config, ...config };
    this.getStore().then(() => {
      if (this.config.maxAge > 0) setInterval(this.clearExpired.bind(this), 60000);
    });
  }

  public async get<T>(key: string) {
    const store = await this.getStore();
    return new Promise<T | undefined>((resolve, reject) => {
      const request = store.get(key);
      request.onerror = reject;
      request.onsuccess = function() {
        let result = this.result?.v;
        resolve(typeof result !== 'undefined' ? (result as T) : undefined);
      };
    });
  }

  public async getKeys() {
    const store = await this.getStore();
    return new Promise((resolve, reject) => {
      const request = store.getAllKeys();
      request.onerror = reject;
      request.onsuccess = function() {
        const keys = this.result.map(v => v.toString());
        resolve(keys);
      };
    });
  }

  public async set(key: string, value: any) {
    const store = await this.getStore();
    return new Promise<void>((resolve, reject) => {
      const request = store.put({ k: key, v: value, t: Date.now() });
      request.onsuccess = () => resolve();
      request.onerror = reject;
    });
  }

  public async remove(key: string) {
    const store = await this.getStore();
    return new Promise((resolve, reject) => {
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = reject;
    });
  }

  public async clear() {
    const store = await this.getStore();
    new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = reject;
    });
  }

  public async getStore(): Promise<IDBObjectStore> {
    const { dbName, tableName } = this.config;
      if (!indexedDBSupported) {
        if (this.inMemoryStore) return this.inMemoryStore;
        console.warn('IndexedDB is not supported, falling back on memory');
        this.inMemoryStore = (getInMemoryStore() as unknown) as IDBObjectStore;
        return this.inMemoryStore;
      } else {
        this.db = this.db || await getKeyValueDb(dbName, tableName);
        const store = this.db.transaction(tableName, 'readwrite').objectStore(tableName);
        return store;
      }

    function getInMemoryStore() {
      const mapName = dbName + tableName;
      // @ts-ignore: globalthis def
      globalThis.indexedDBMock[mapName] = new Map();
      // @ts-ignore: globalthis def
      const mock = globalThis.indexedDBMock[mapName];

      // Mimics the callback style of IDBObjectStore methods
      class UnPromise {
        result: any;

        constructor(res: any) {
          const self = this;
          if (Array.isArray(res)) this.result = res;
          else this.result.v = res;
          setTimeout(() => self.onsuccess(), 1);
        }

        onsuccess = (): void => {
          throw new Error('This must be overridden');
        };
        onerror = (): void => {
          throw new Error('This is unreachable');
        };
      }

      const store = {
        get: (key: string) => new UnPromise(mock.get(key)),
        getAllKeys: () => new UnPromise(Array.from(mock.getKeys()).map(k => `${k}`)),
        put: (key: string, value: any) => new UnPromise(mock.set(key)),
        delete: (key: string) => new UnPromise(mock.delete(key)),
        clear: () => new UnPromise(mock.clear()),
      };
      return store;
    }

    function getKeyValueDb(dbName: string, tableName: string) {
      return new Promise<IDBDatabase>((resolve, reject) => {
        if (!indexedDB) {
          reject('indexedDB not supported');
          return;
        }

        const request = indexedDB.open(dbName, 1);
        request.onsuccess = function() {
          resolve(this.result);
        };

        request.onerror = function(event: any) {
          reject('indexedDB request error');
          console.error(event);
        };

        request.onupgradeneeded = function() {
          const store = this.result.createObjectStore(tableName, {
            keyPath: 'k',
          });

          store.createIndex('t', 't', { unique: false });

          store.transaction.oncomplete = function() {
            resolve(this.db);
          };
        };
      });
    }
  }

  public async clearExpired() {
    const { maxAge } = this.config;
    const store = await this.getStore();
    return new Promise((resolve, reject) => {
      const request = store.index('t').openCursor(IDBKeyRange.upperBound(Date.now() - maxAge!));

      request.onsuccess = event => {
        // @ts-ignore
        const cursor = event.target!.result;
        if (cursor) {
          store.delete(cursor.primaryKey);
          cursor.continue();
        } else {
          resolve();
        }
      };
      request.onerror = reject;
    });
  }
}

export interface KeyValueStoreConfig {
  dbName: string;
  tableName: string;
  maxAge: number;
}
