import type { Country } from "../types/country";
import { useNavigate } from "react-router-dom";
import "../index.css";
import "../css/country-list.css"


function CountryCard(props: { country?: Country }) {
  //recibe un objeto props y navigate permite cambiar de página al hacer click en la tarjeta
  const navigate = useNavigate();
  

  return (
    <div key={props.country?.codes.ccn3} className="card" onClick={() => {
    console.log("country:", props.country);
    //al hacer click pasa el país en el state para mostrar los detalles
    navigate(`/country/${props.country?.names.common}`, { state: { country: props.country } });
}}>
      <img
        src={props.country?.flag.url_png}
        alt={props.country?.names.common}
        className="flag"
      />

      <h2>{props.country?.names.common}</h2>

      <p><strong>Población:</strong> {props.country?.population.toLocaleString()}</p>
      <p><strong>Región:</strong> {props.country?.region}</p>
      <p>
        <strong>Capital:</strong>{" "}
        {props.country?.capitals?.[0]?.name ?? "Sin capital"}
      </p>
    </div>
    )
  

}

export default CountryCard
