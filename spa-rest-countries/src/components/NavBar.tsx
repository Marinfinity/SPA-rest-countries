import { FaUserCircle } from "react-icons/fa";
import "../index.css";
import "../css/nav.css"
function NavBar({

  //recibe props desde home
  query,
  filter,
  onQueryChange,
  onFilterChange
}: {
  query: string;
  filter: string;
  onQueryChange: (value: string) => void;
  onFilterChange: (value: string) => void
}) {

  return (
    <nav className="navbar">
      <input
        type="text"
        placeholder="Buscar un país..."
        value={query}
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

      <FaUserCircle size={28} className="profile-icon" />
    </nav>
  )
}

export default NavBar
