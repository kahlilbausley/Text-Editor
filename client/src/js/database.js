import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  return new Promise((resolve) => {
    request = openDB.open('myDB', version);

    request.onsuccess = () => {
      console.log('request.onsuccess - addData', content);
      db=request.results
      const tx = db.transaction('jate', 'readwrite');
      const store = tx.objectStore('jate');
      store.add(content);
      resolve(data);
    };

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        resolve(error);
      } else {
        resolve('Unknown error');
      }
    };
  });


}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  return new Promise((resolve) => {
    request = openDB.open('myDB');

    request.onsuccess = () => {
      console.log('request.onsuccess - getAllData');
      db = request.result;
      const tx = db.transaction('jate', 'readonly');
      const store = tx.objectStore('jate');
      const res = store.getAll();
      res.onsuccess = () => {
        resolve(res.result);
      };
    };
  });



}
initdb();
