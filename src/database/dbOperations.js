import db from './database';

export const createTable = () => {
  // create table
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, price INTEGER NOT NULL, image TEXT )',
      [],
      (tx, results) => {
        console.log('Table created successfully');
      },
      error => {
        console.log(error);
      },
    );
  });
};

export const insertData = (name, price, image) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO users (name, price, image) VALUES(?, ?, ?)',
      [name, price, image],
      (tx, results) => {
        console.log('Insert successful');
      },
      error => {
        console.log(error);
      },
    );
  });
};

export const updateUser = (name, price, id) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE users SET name=? , price=? WHERE id=?',
      [name, price, id],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log('User data updated Successfully');
        } else {
          console.log('Failed to updated users details');
        }
      },
    );
  });
};
