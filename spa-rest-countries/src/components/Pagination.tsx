import "../css/pagination.css";
function Pagination({
    currentPage,
    totalPages,
    onChange
}: {
    currentPage: number;
    totalPages: number;
    onChange: (page: number) => void;
}) {
    return (
        <div className="pagination">

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                    key={num}
                    className={num === currentPage ? "active" : ""}
                    onClick={() => onChange(num)}
                >
                    {num}
                </button>
            ))}
        </div>
    );
}

export default Pagination
