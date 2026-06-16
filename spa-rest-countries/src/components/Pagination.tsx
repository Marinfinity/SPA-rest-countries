import "../css/pagination.css";
function Pagination({
    //props que recibe
    currentPage,
    totalPages,
    onChange
}: {
    currentPage: number;
    totalPages: number;
    //la función se ejecuta cuando el usuario hace click en el número de página, es setPage
    onChange: (page: number) => void;
}) {
    return (
        <div className="pagination">
            {/*Crea un array vacío con tantos elementos como páginas haya y convierte los elementos vacíos en números de página
            Por cada número, renderiza un botón.*/}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                    key={num}
                    className={num === currentPage ? "active" : ""} //si el botón corresponde a la página actual le asigno la clase activa para que se vea resaltado
                    onClick={() => onChange(num)}
                >
                    {num}
                </button>
            ))}
        </div>
    );
}

export default Pagination
