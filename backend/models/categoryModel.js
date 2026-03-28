const sqlite3 = require('sqlite3').verbose();

const database = new sqlite3.Database('./database.db');

database.serialize(() => {
  database.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      image TEXT
    )
  `);
});

module.exports = database;