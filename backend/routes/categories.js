const router = require('express').Router();
const database = require('../models/categoryModel');

// CREATE
router.post('/', (req, res) => {
  const { name, image } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Nombre requerido' });
  }

  database.run(
    `INSERT INTO categories (name, image) VALUES (?, ?)`,
    [name, image],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
});

// READ
router.get('/', (req, res) => {
  database.all('SELECT * FROM categories', [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// UPDATE
router.put('/:id', (req, res) => {
  const { name, image } = req.body;
  database.run(
    `UPDATE categories SET name=?, image=? WHERE id=?`,
    [name, image, req.params.id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ updated: true });
    }
  );
});

// DELETE
router.delete('/:id', (req, res) => {
  database.run(`DELETE FROM categories WHERE id=?`, [req.params.id], err => {
    if (err) return res.status(500).json(err);
    res.json({ deleted: true });
  });
});

module.exports = router;
