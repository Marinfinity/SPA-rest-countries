import type { Country } from "../types/country";
import CountryCard from "./CountryCard";
import "../index.css";
import "../css/country-list.css"


export default function CountryList(countries: { countries: Country[] }) {
      const countryCards = countries.countries.map((country) => (
        <CountryCard key={country.codes.ccn3} country={country} />
      ));
  return (
    <div className="grid">
       {countryCards}
    </div>
  );
}
