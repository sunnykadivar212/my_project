import AddToCart from '../screen/Addtocart';
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
      'CREATE TABLE IF NOT EXISTS addtocart (id INTEGER PRIMARY KEY AUTOINCREMENT, userid INTEGER  , name TEXT NOT NULL , price INTEGER NOT NULL, image TEXT NOT NULL ,quantity INTEGER NOL NULL, productId INTEGER,FOREIGN KEY(productId) REFERENCES products(id),FOREIGN KEY(userid) REFERENCES users(id))',
      [],
      (tx, results) => {
        console.log('addtocart Table created successfully');
      },
      error => {
        console.log(error);
      },
    );

    // Payment Table
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS payment (id INTEGER PRIMARY KEY AUTOINCREMENT, userid INTEGER , total INTEGER, date TEXT,FOREIGN KEY(userid) REFERENCES users(id))',
      [],
      (tx, results) => {
        console.log('payment Table created successfully');
      },
      error => {
        console.log(error);
      },
    );

    //MyOrders Table
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Myorders (id INTEGER PRIMARY KEY AUTOINCREMENT, userid INTEGER,trangactionId INTEGER NOT NULL, name TEXT NOT NULL, price INTEGER NOT NULL, quantity INTEGER NOT NULL, image TEXT NOT NULL,FOREIGN KEY(userid) REFERENCES users(id))',
      [],
      (tx, results) => {
        console.log('Myorders Table created successfully');
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

export const insertPaymentDetail=(userid, total ,date)=>{
try {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO payment (userid, total, date) VALUES(?, ?, ?)',
      [userid, total ,date],
      (tx, results) => {
        console.log('paymentDetails Inserted successfully');
      },
      error => {
        console.log(error);
      },
    );
  });
} catch (error) {
  console.log(error)
}
}

export const insertIntoCartItems = (
  userid,
  name,
  price,
  image,
  quantity,
  productId,
) => {
  console.log(userid, name, price, image, quantity, productId);
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO addtocart (userid, name, price, image, quantity, productId) VALUES(?, ?, ?, ?, ?, ?)',
      [userid, name, price, image, quantity, productId],
      console.log('userid===>', userid),
      (tx, results) => {
        console.log('addtocart Inserted successfully');
      },
      error => {
        console.log(error);
      },
    );
  });
};

export const updateaddtocart = async (quantity, userid, productId) => {
  console.log('Updating addtocart with quantity:', quantity);
  console.log('User ID:', userid);
  console.log('Product ID:', productId);
  try {
    await db.transaction(tx => {
      tx.executeSql(
        'UPDATE addtocart SET quantity=? WHERE userid = ? AND productId=?',
        [quantity, userid, productId],
        (tx, results) => {
          console.log('cart update successfully');
        },
      );
    });
  } catch (error) {
    console.log('Update AddToCart=>', error);
  }
};

export const deleteaddtocart = async (userid, productId) => {
  console.log('storeUserid==>', userid);
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM addtocart WHERE userid=? AND productId=?',
      [userid, productId],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log('User data delete Successfully');
        } else {
          console.log('Failed to updated users details');
        }
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
