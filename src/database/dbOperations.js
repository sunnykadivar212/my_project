import db from './database';

export const createTable = () => {

    // create table
    db.transaction(tx => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, price INTEGER NOT NULL, image TEXT NOT NULL)",
            [],
            (tx, results) => {
                console.log('Table created successfully');
            },
            (error) => {
                console.log(error);
            }
        )
    })
};


export const insertData = () => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO users (name, price, image) VALUES(?, ?, ?)',
            [name, price, image],
            (tx, results) => {
                console.log('Insert successful', results);
            },
            (error) => {
                console.log(error);
            }
        );
    });
};
