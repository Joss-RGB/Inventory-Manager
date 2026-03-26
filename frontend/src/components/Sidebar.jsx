import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen flex  flex-col p-4 fixed">
      <h1 className="text-2xl font-bold mb-6">Inventario</h1>
      <NavLink
        to="/inventory"
        className={({ isActive }) =>
          `mb-2 px-4 py-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
        }
      >
        Inventario
      </NavLink>
      <NavLink
        to="/add"
        className={({ isActive }) =>
          `mb-2 px-4 py-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
        }
      >
        Agregar Producto
      </NavLink>
      <NavLink
        to="/reports"
        className={({ isActive }) =>
          `mb-2 px-4 py-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
        }
      >
        Reportes
      </NavLink>
    </div>
  );
}