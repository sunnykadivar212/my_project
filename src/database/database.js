import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'Nilcorebath.db',
    location: 'default',
  },
)

export default db;
