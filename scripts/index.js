const storeName = 'currency-converter-store';
class localIndexdb{

  static open(dbName='currency-converter-code-challenge', version=1) {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        const message = "Check out on your Browser";
        throw new Error(message);
      }
      const request = window.indexedDB.open(dbName, version);
      request.onerror = error => reject(error);
      request.onsuccess = (event) => {
        console.log(dbName, 'IndexedDB opened');
        const { target: { result } } = event;
        resolve(result);
      };
      request.onupgradeneeded = (event) => {
        console.log(storeName, 'created');
        const { target: { result } } = event;
        const db = result;
        db.createObjectStore(storeName, { keyPath: 'id' });
      };
    })
  }

  static setItem(key, value, db) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], "readwrite");
      transaction.oncomplete = () => console.log('Saving complete');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.put({ id: key, value });
      request.onerror = (event) => reject(event.error);
      request.onsuccess = (event) => resolve(event.target.result === key);
    });
  }

  static removeItem(key, db) {
    return new Promise((resolve, reject) => {
      const request = db.transaction([storeName], 'readwrite')
      .objectStore(storeName)
      .delete(key);
      request.onerror = (event) => reject(event.error);
      request.onsuccess = () => resolve(true);
    });
  }

  static getItem(key, db) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName);
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.get(key);
      request.onerror = (event) => reject(event.error);
      request.onsuccess = (event) => resolve(event.target.result);
    });
  }
}
//window.LocalIndexedStorage = localIndexed storage;
