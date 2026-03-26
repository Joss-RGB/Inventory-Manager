const express = require('express');
const cors = require('cors');
const productsRoutes = require('./routes/products');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productsRoutes);

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));