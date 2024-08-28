import PropTypes from "prop-types"; // Import PropTypes

function Pagination({ currentPage, totalPages, onPageChange }) {
  /**
   * Generates an array of page numbers from 1 to totalPages.
   *
   * @param {number} totalPages - The total number of pages.
   * @param {number} currentPage - The current page number (not used in this function).
   * @returns {number[]} An array of page numbers from 1 to totalPages.
   */
  function generateNumber() {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const handlePrevious = () => {
    onPageChange(currentPage - 1);
  };
  const handleNext = () => {
    onPageChange(currentPage + 1);
  };
  return (
    <>
      <button
        className="pagination-btn"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {generateNumber().map((page) => (
        <button
          className={`pagination-btn ${currentPage === page ? "active " : ""}`}
          key={page}
          onClick={() => {
            onPageChange(page);
          }}
        >
          {page}
        </button>
      ))}
      <button
        className="pagination-btn"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired, // Validate currentPage as a number and mark it as required
  totalPages: PropTypes.number.isRequired, // Validate totalPages as a number and mark it as required
  onPageChange: PropTypes.func.isRequired, // Validate onPageChange as a function and mark it as required
};

export default Pagination;
