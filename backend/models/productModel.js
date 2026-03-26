const sqlite3 = require('sqlite3').verbose();

const database = new sqlite3.Database('./database.db');

database.serialize(() => {
  database.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      quantity INTEGER,
      sold INTEGER DEFAULT 0,
      category TEXT,
      image TEXT
    )
  `);
});

module.exports = database;