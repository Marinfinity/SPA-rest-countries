
import "../index.css";
import "../css/nav.css"
function NavBar({

  //recibe props desde home
  query, //texto de la barra de búsqueda
  filter, //filtro del select
  onQueryChange,
  onFilterChange
}: {
  query: string;
  filter: string;
  onQueryChange: (value: string) => void;  //Función que se ejecuta cuando el usuario escribe en la barra de búsqueda setQuery y setPage
  onFilterChange: (value: string) => void  // setFilter y setPage
}) {

  return (
    <nav className="navbar">
      <input
        type="text"
        placeholder="Buscar un país..."
        value={query}
        //cada vez que el usuario escribe se llama a onQueryChange que actualiza el estado en la home y reinicia la paginación
        onChange={(e) => onQueryChange(e.target.value)}
      />

      <select value={filter} onChange={(e) => onFilterChange(e.target.value)}>
        <option value="all">Todas las regiones</option>
        <option value="Africa">África</option>
        <option value="Americas">América</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europa</option>
        <option value="Oceania">Oceanía</option>
      </select>

    </nav>
  )
}

export default NavBar
