function Pagination({ page, setPage, totalPages }) {
  const pagesPerView = 5;

  const startPage = Math.max(
    1,
    Math.min(page - 2, totalPages - pagesPerView + 1)
  );

  const endPage = Math.min(
    startPage + pagesPerView - 1,
    totalPages
  );

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="pagination">
      {page > 1 && (
        <button onClick={handlePrev}>
          Prev
        </button>
      )}

      {Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => {
          const pageNumber = startPage + index;

          return (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={
                page === pageNumber
                  ? "active-page"
                  : ""
              }
            >
              {pageNumber}
            </button>
          );
        }
      )}

      {page < totalPages && (
        <button onClick={handleNext}>
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;