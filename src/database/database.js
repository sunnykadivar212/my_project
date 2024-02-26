import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: 'Nilcorebath.db',
        location: 'default'
    },
    () => { console.log('created database successfully') },
    error => {
        console.log(error);
    }
);

export default db;