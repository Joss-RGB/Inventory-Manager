const router = require('express').Router();
const database = require('../models/productModel');

// CREATE
router.post('/', (req, res) => {
  const { name, price, quantity, category, description, status, image } = req.body;

  database.run(
    `INSERT INTO products 
    (name, price, quantity, category, description, status, image, sold) 
    VALUES (?, ?, ?, ?, ?, ?, ?, 0)`,
    [name, price, quantity, category, description, status || 'activo', image],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
});

// READ
router.get('/', (req, res) => {
  database.all('SELECT * FROM products', [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// UPDATE
router.put('/:id', (req, res) => {
  const { name, price, quantity, sold, category, image } = req.body;
  database.run(
    `UPDATE products 
     SET name=?, price=?, sold=?, quantity=?, category=?, description=?, status=?, image=? 
     WHERE id=?`,
    [name, price, quantity, category, sold, description, status, image, req.params.id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ updated: true });
    }
  );
});

// DELETE
router.delete('/:id', (req, res) => {
  database.run(`DELETE FROM products WHERE id=?`, [req.params.id], err => {
    if (err) return res.status(500).json(err);
    res.json({ deleted: true });
  });
});

module.exports = router;