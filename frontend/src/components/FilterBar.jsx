export default function FilterBar({ filters, setFilters, categories = [], names = [], products = [] }) {
  // Ordenar categorías y nombres alfabéticamente
  const sortedCategories = [...categories].sort((a, b) => a.localeCompare(b));
  const sortedNames = [...names].sort((a, b) => a.localeCompare(b));

  // Filtrar nombres según categoría seleccionada
  const filteredNames = filters.category
    ? products
        .filter((p) => p.category === filters.category)
        .map((p) => p.name)
        .sort((a, b) => a.localeCompare(b))
    : sortedNames;

  return (
    <div className="mb-4 flex flex-col md:flex-row gap-2 ml-64">
      {/* Filtrar por nombre */}
      <select
        value={filters.name}
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        className="border p-2 rounded flex-1"
      >
        <option value="">Todos los nombres</option>
        {filteredNames.map((n) => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>

      {/* Filtrar por categoría */}
      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value, name: "" })} 
        className="border p-2 rounded flex-1"
      >
        <option value="">Todas las categorías</option>
        {sortedCategories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* Filtrar por precio */}
      <input
        placeholder="Precio min"
        type="number"
        value={filters.minPrice}
        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        className="border p-2 rounded flex-1"
      />
      <input
        placeholder="Precio max"
        type="number"
        value={filters.maxPrice}
        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        className="border p-2 rounded flex-1"
      />
    </div>
  );
}
