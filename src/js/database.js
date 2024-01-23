// client/src/js/database.js
import { openDB } from 'idb';


const initDB = async () => {
  return openDB('text-editor-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('content')) {
        db.createObjectStore('content', { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const putContent = async (content) => {
  const db = await initDB();
  const tx = db.transaction('content', 'readwrite');
  const store = tx.objectStore('content');
  await store.put({ content });
  await tx.done;
};

export const getContent = async () => {
  const db = await initDB();
  const tx = db.transaction('content', 'readonly');
  const store = tx.objectStore('content');
  const data = await store.getAll();
  await tx.done;
  return data;
};
export const getDb = initDB;