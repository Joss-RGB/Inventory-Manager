const express = require('express');
const cors = require('cors');
const productsRoutes = require('./routes/products'); // ruta CRUD

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // permite recibir JSON en el body

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

// Rutas de productos
app.use('/api/products', productsRoutes);

// Servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));