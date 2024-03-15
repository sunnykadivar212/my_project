import db from './database';

export const createTable = () => {
  // create table
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,email TEXT NOT NULL, password TEXT NOT NULL)',
      [],
      (tx, results) => {
        console.log('users Table created successfully');
      },
      error => {
        console.log(error);
      },
    ),
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, userid INTEGER , name TEXT NOT NULL, price INTEGER NOT NULL, image TEXT NOT NULL ,FOREIGN KEY(userid) REFERENCES users(id))',
        [],
        (tx, results) => {
          console.log('Products Table created successfully');
        },
        error => {
          console.log(error);
        },
      );

    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS addtocart (id INTEGER PRIMARY KEY AUTOINCREMENT, userid INTEGER  , name TEXT NOT NULL , price INTEGER NOT NULL, image TEXT NOT NULL ,quantity INTEGER NOL NULL,FOREIGN KEY(userid) REFERENCES users(id))',
      [],
      (tx, results) => {
        console.log('addtocart Table created successfully');
      },
      error => {
        console.log(error);
      },
    );
  });
};

export const insertProduct = (userid, name, price, image) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO products (userid, name, price, image) VALUES(?, ?, ?, ?)',
      [userid, name, price, image],
      (tx, results) => {
        console.log('Product Inserted successfully');
      },
      error => {
        console.log(error);
      },
    );
  });
};

export const insertintoaddtocart = (userid, name, price, image, quantity) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO addtocart(userid,name, price, image,quantity) VALUES(?,?,?,?,?)',
      [userid, name, price, image, quantity],
      (tx, results) => {
        console.log('Addtocart Inserted successfully');
      },
      error => {
        console.log(error);
      },
    );
  });
};

export const updateUser = (name, price, image, id) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE users SET name=? , price=? , image=? WHERE id=?',
      [name, price, image, id],
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
