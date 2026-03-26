# Inventory App

A full-stack web application to manage product inventory with CRUD operations, filtering, and reporting features.

---

## Technologies Used

### Backend
- Node.js
- Express
- SQLite

### Frontend
- React (Vite)
- Tailwind CSS
- React Router

---

## Project Structure
inventario-app/
│
├── backend/
│ ├── models/
│ │ └── productModel.js
│ ├── routes/
│ │ └── products.js
│ ├── database.db
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ └── App.jsx
│ └── main.jsx


---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Joss-RGB/Inventory-Manager.git
cd Inventory-Manager
```

### 2. Backend

```bash
cd backend
npm install
node server.js
```
Server runs at:
http://localhost:3000

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```
App runs at:
http://localhost:5173

## Features
- Create products
- Edit products
- Delete products
- Register sales
- Stock control
- Filters by:
  - Name
  - Category
  - Price
  - Status
- Reports:
  - Total inventory value
  - Revenue generated from sales
  - Top-selling products ranking

## Screenshots
### Inventory Page
![Inventory](/Screenshots/image1.png)

### Add Product
![Add_Product](./screenshots/image.png)

### Reports
![Reports](/Screenshots/image2.png)

## Author

Developed by ***Jose***

## License

This project is under MIT License, free to use for learning purposes.