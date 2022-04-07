const DB_NAME = 'master_passwordDB'
const DB_VERSION = 1

export const storageName = {
  profile: 'profile_record',
  password: "password_record"
}
export const testProfileRecord = {
  id: 1,
  login: "master",
  password: "masterpassword",

}
export const testPasswordRecord = {
  profile_id: testProfileRecord.id,
  id: 1,
  name: "ВКонтакте",
  login: "user",
  password: "user1234"
}

// добавление хранилищ для сущностей типа Профиль и Пароль
const configDb = (db) => {
  let objectStore = db.createObjectStore(storageName.profile, { keyPath: 'id' })
  // Хранилище объектов внутренне сортирует значения по ключам id
  objectStore.createIndex("id", "id", { unique: true });
  objectStore.createIndex("login", "login", { unique: false });
  objectStore.createIndex("password", "password", { unique: false });
  objectStore = db.createObjectStore(storageName.password, { keyPath: 'id' })
  objectStore.createIndex("profile_id", "profile_id", { unique: true });
  objectStore.createIndex("id", "id", { unique: true });
  objectStore.createIndex("name", "name", { unique: false });
  objectStore.createIndex("login", "login", { unique: false });
  objectStore.createIndex("password", "password", { unique: false });
}

export class IndexedDB {
  // подключение к IndexedDB
  initDB() {

    return new Promise((resolve, reject) => {

      // объект соединения с базой данных
      this.db = null;

      let idb =window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || null

      if (!idb) {
        window.alert("Ваш браузер не поддерживает IndexedDB. База данных не доступна");
      }

      // открываем запрос к базе данных с именем dbName со схемой версии dbVersion
      const openRequest  =idb.open(DB_NAME, DB_VERSION);

      // если базы данных нет, то создаем схемы базы данных
      openRequest .onupgradeneeded = () => {
        configDb(openRequest.result);
      };

      openRequest .onsuccess = () => {
        this.db = openRequest.result;
        resolve(this);
      };

      openRequest .onerror = event => {
        let errorCode = event.target?.errorCode
        alert("Ошибка чтения базы данных: " + errorCode);
        reject(`IndexedDB error: ${errorCode}`);
      };

    });

  }

   add(storeName, value) {

    return new Promise((resolve, reject) => {

      // новая транзакция
      const
        transaction = this.db.transaction(storeName, 'readwrite'),
        store = transaction.objectStore(storeName);

      // пытаемся добавить запись
      store.add(value);

      transaction.oncomplete = () => {
        console.log("Запись успешно добавлена");
        resolve(true);
      };

      transaction.onerror = () => {
        console.error("Не удалось добавить запись");
        reject(transaction.error);
      };

    });

  }

  set(storeName, name, value) {

    return new Promise((resolve, reject) => {

      // новая транзакция
      const
        transaction = this.db.transaction(storeName, 'readwrite'),
        store = transaction.objectStore(storeName);

      // записываем элемент
      store.put(value, name);

      // успех транзакции
      transaction.oncomplete = () => {
        console.log("Запись успешно изменена");
        resolve(true);
      };

      // ошибка транзакции
      transaction.onerror = () => {
        console.error("Не удалось сохранить изменения в записи");
        reject(transaction.error);
      };

    });

  }
  // получение первого значения с ключом
  get(storeName, key) {

    return new Promise((resolve, reject) => {

      // новая транзакция
      const
        transaction = this.db.transaction(storeName, 'readonly'),
        store = transaction.objectStore(storeName),

        // получить первую запись с таким значением
        request = store.get(key);

      request.onsuccess = () => {
        console.log("Запись успешно загружена");
        resolve(request.result);
      };

      request.onerror = () => {
        console.error("Не удалось загрузить запись");
        reject(request.error);
      };

    });

  }
  // получение всех значений с ключом
  getAll(storeName, key) {

    return new Promise((resolve, reject) => {

      // новая транзакция
      const
        transaction = this.db.transaction(storeName, 'readonly'),
        store = transaction.objectStore(storeName),

      // получить значение
      request = store.getAll(key);

      request.onsuccess = () => {
        console.log("Запись успешно загружена");
        resolve(request.result);
      };

      request.onerror = () => {
        console.error("Не удалось загрузить запись");
        reject(request.error);
      };

    });

  }
  delete(storeName, name) {

    return new Promise((resolve, reject) => {

      // новая транзакция
      const
        transaction = this.db.transaction(storeName, 'readwrite'),
        store = transaction.objectStore(storeName);

      // записываем элемент
      store.delete(name);

      // успех транзакции
      transaction.oncomplete = () => {
        console.log("Запись успешно удалена");
        resolve(true);
      };

      // ошибка транзакции
      transaction.onerror = () => {
        console.error("Не удалось удалить запись");
        reject(transaction.error);
      };

    });

  }
}
