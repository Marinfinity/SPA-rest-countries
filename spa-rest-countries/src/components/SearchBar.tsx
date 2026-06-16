import "../index.css";
import "../css/nav.css"
function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Buscar país..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
