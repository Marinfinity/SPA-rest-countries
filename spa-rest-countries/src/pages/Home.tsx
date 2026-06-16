import { useEffect, useState } from "react";
import CountryList from "../components/CountryList";
import type { Country } from "../types/country";
import '../css/home.css';
import NavBar from "../components/NavBar";
import Pagination from "../components/Pagination";
import Banner from "../components/Banner";

function Home() {
    //guardo todos los paises que vienen de la api
    const [allCountries, setAllCountries] = useState<Country[]>([]);
    //paginación y filtros
    const [page, setPage] = useState(1);
    //filtros de búsqueda
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("all");
    //estado de carga
    const [loading, setLoading] = useState(true);
    //
    const limit = 25;
    const headers = { 'Authorization': 'Bearer rc_live_4160c6765ae442b0b6e337cd47157a8e' };
    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            let all: Country[] = [];
            let offset = 0;
            let total = 200000; // valor inicial grande para entrar al bucle

            // Hacemos peticiones en bucle hasta tener todos
            while (all.length < total) {
                const res = await fetch(
                    `https://api.restcountries.com/countries/v5?limit=100&offset=${offset}`,
                    { headers: headers }
                );
                const json = await res.json();
                // Agregamos los nuevos países a la lista y actualizamos el total y el offset
                all = [...all, ...json.data.objects];
                total = json.data.meta.total;
                offset += 100;
            }

            setAllCountries(all);
            setLoading(false);
        };

        fetchAll();
    }, []); // Solo al montar

    //filtrar todos los países
    const filtered = allCountries.filter((country) => {
        const matchesName = country.names.common
            .toLowerCase()
            .includes(query.toLowerCase());
        const matchesRegion = filter === "all" ? true : country.region === filter;
        return matchesName && matchesRegion;
    });

    //Calculamos la paginación sobre los resultados filtrados
    //ceil redondea hacia arriba, para que si hay 26 paises y el limite es 25, haya 2 paginas
    const totalPages = Math.ceil(filtered.length / limit);

    // Cortamos el slice de la página actual
    const pageCountries = filtered.slice((page - 1) * limit, page * limit);

    //Cuando cambia el filtro o la búsqueda, volvemos a la página 1
    const handleQueryChange = (q: string) => {
        setQuery(q);
        setPage(1);
    };
    const handleFilterChange = (f: string) => {
        setFilter(f);
        setPage(1);
    };

    if (loading) return <p>Cargando países...</p>;
    return (
        <>
            <div className="app-wrapper">

                <Banner />

                {/* 2. Contenedor principal que "sube" un poco para solapar al banner */}
                <main className="main-content">

                    {/* El buscador ahora es lo primero dentro del contenido principal */}
                    <NavBar
                        query={query}
                        onQueryChange={handleQueryChange}
                        filter={filter}
                        onFilterChange={handleFilterChange}
                    />

                    <div className="content-layout">
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onChange={setPage}
                        />

                        {/*Por si no hay resultados en la búsqueda */}
                        {filtered.length === 0 ? (
                            <p className="sin-resultados">No se encontraron países para "{query}"</p>
                        ) : (
                            <CountryList countries={pageCountries} />
                        )}
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onChange={setPage}
                        />
                    </div>
                </main>
            </div>

        </>
    )
}

export default Home
