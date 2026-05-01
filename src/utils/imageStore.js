// IndexedDB-backed image storage for large data URLs.
// localStorage has a 5MB cap across all keys — after a handful of uploaded
// photos it silently fails (setItem throws QuotaExceededError). We stash the
// actual pixel data in IDB and leave only a sentinel string in localStorage
// so the edit store stays small and never loses writes.

const DB_NAME = 'visionoid_credential_images';
// Bumped from 1 → 2 to force onupgradeneeded to run for users whose
// database was previously created (by a broken migration) WITHOUT the
// `images` object store. The upgrade handler is idempotent — if the
// store already exists it leaves it alone.
const DB_VERSION = 2;
const STORE = 'images';
export const IDB_MARKER = '__IDB__';

function openDb() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      return reject(new Error('IndexedDB not available'));
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    };
    req.onsuccess = () => {
      const db = req.result;
      // Defensive: if for any reason the store still isn't there (older
      // browsers may have skipped onupgradeneeded after a corrupted state),
      // close and delete the database so the next call recreates it cleanly.
      if (!db.objectStoreNames.contains(STORE)) {
        db.close();
        const del = indexedDB.deleteDatabase(DB_NAME);
        del.onsuccess = () => {
          // Re-open which will trigger onupgradeneeded properly.
          openDb().then(resolve).catch(reject);
        };
        del.onerror = () => reject(new Error('Failed to recover broken IDB'));
        return;
      }
      resolve(db);
    };
    req.onerror = () => reject(req.error || new Error('IDB open failed'));
  });
}

export async function imgPut(key, dataUrl) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put(dataUrl, key);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}

export async function imgGet(key) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).get(key);
    req.onsuccess = () => { db.close(); resolve(req.result || null); };
    req.onerror = () => { db.close(); reject(req.error); };
  });
}

export async function imgDelete(key) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).delete(key);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}

export async function imgListKeys() {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).getAllKeys();
    req.onsuccess = () => { db.close(); resolve(req.result || []); };
    req.onerror = () => { db.close(); reject(req.error); };
  });
}

export async function imgClear() {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).clear();
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}
