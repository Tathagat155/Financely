function Pagination({ page, setPage, totalPages }) {
  return (
    <div className="pagination">
      {Array.from(
        {
          length: totalPages,
        },
        (_, index) => (
          <button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            className={page === index + 1 ? "active-page" : ""}
          >
            {index + 1}
          </button>    
        ),
      )}
    </div>
  );
}

export default Pagination;
