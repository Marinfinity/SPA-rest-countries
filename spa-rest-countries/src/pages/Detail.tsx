import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import type { Country } from "../types/country";
import "../index.css";
import "../css/detalles.css";

type UIState = "loading" | "error" | "success";

function Detail() {

    //obtiene el names.common del país de la URL
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    console.log("state:", location.state);
    console.log("stateCountry:", location.state?.country);
    // Si viene del listado, el país ya está en el state — úsalo directamente
    const stateCountry = location.state?.country as Country | undefined;
    const [country, setCountry] = useState<Country | null>(stateCountry ?? null);
    //arranca con los datos si ya los tenemos
    const [uiState, setUiState] = useState<UIState>(stateCountry ? "success" : "loading");
    //si ya tenemos datos, no hace falta cargar


    const headers = { 'Authorization': 'Bearer rc_live_4160c6765ae442b0b6e337cd47157a8e' };

    useEffect(() => {
        // Si ya tenemos el país del state, no hacemos fetch
        if (stateCountry) return;
        if (!name) return;

        setUiState("loading");

        // Busca por nombre como fallback (cuando el usuario entra directo por URL)
        fetch(`https://api.restcountries.com/countries/v5?q=${name}`, {
            headers,
        })
            .then((res) => {
                if (!res.ok) throw new Error("País no encontrado");
                return res.json();
            })
            .then((json) => {
                setCountry(json.data.objects[0]); // misma estructura que en Home
                setUiState("success");
            })
            .catch(() => {
                setUiState("error");
            });
    }, [name]);

    //Estados de UI
    if (uiState === "loading") {
        return <p className="status">Cargando...</p>;
    }
    if (uiState === "error" || !country) {
        return (
            <div className="status">
                <p>No se pudo cargar el país.</p>
                <button onClick={() => navigate("/")}>← Volver</button>
            </div>
        );
    }

    //Para los idiomas
    const languages = country.languages
        ? country.languages.map((l) => l.name).join(", ")
        : "N/A";

    //Para las monedas
    const currencies = country.currencies
        ? Object.values(country.currencies)
            .map((c: any) => `${c.name} (${c.symbol})`)
            .join(", ")
        : "N/A";

    //Añadir país a favoritos
    const [esFavorito, setEsFavorito] = useState(false);

    const toggleFavorito = async () => {
        if (esFavorito) {
            await fetch(`http://localhost:3001/api/favoritos/${country.names.common}`, {
                method: "DELETE"
            });
        } else {
            await fetch("http://localhost:3001/api/favoritos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre: country.names.common })
                
            });
        }
        setEsFavorito(!esFavorito);
    };


    return (
        <div className="detail">
            {/* Botón Volver */}
            <button className="btn-volver" onClick={() => navigate(-1)}>← Volver</button>

            <div className="banner-detalle">
                <div className="contenido-banner">
                    <div className="text-side">
                        <p className="detail-subtitulo">EXPLORANDO</p>
                        <h1 className="detail-titulo">{country.names.common}</h1>
                        <p className="nombre-oficial">{country.names.official}</p>
                        <div className="separador"></div>
                        {/*Añadir a Favoritos*/}
                        <button onClick={toggleFavorito} className="btn-favorito">
                            {esFavorito ? "❤ Favorito" : " ♡ Añadir a favoritos"}
                        </button>
                    </div>

                    {/* La bandera actúa como la imagen flotante de la derecha */}
                    <div className="lado-imagen">
                        <img
                            src={country.flag.url_png}
                            alt={`Bandera de ${country.names.common}`}
                            className="bandera"
                        />
                    </div>
                </div>

            </div>

            <div className="detail-container">
                <div className="detail-grid">
                    <div className="info-card">
                        <h2>Información General</h2>
                        <p><strong>Capital:</strong> {country.capitals?.[0]?.name ?? "Sin capital"}</p>
                        <p><strong>Región:</strong> {country.region}</p>
                        <p><strong>Población:</strong> {country.population.toLocaleString()}</p>
                    </div>
                    <div className="info-card">
                        <h2>Detalles Técnicos</h2>
                        <p><strong>Idiomas:</strong>   {languages}</p>
                        <p><strong>Monedas:</strong> {currencies}</p>
                        <p><strong>Código:</strong> {country.codes.ccn3}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail
