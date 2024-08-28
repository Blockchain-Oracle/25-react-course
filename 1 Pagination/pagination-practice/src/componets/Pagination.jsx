import PropTypes from "prop-types"; // Import PropTypes
import "./pagination.css";
export default function Pagination({ changePage, totalPage, currentPage }) {
  function generatePageNumber() {
    return Array.from({ length: totalPage }, (_, index) => index + 1);
  }

  const handlePreviousClick = () => {
    changePage(currentPage - 1);
  };
  const handleNextClick = () => {
    changePage(currentPage + 1);
  };

  const handlePageonClick = (_change) => {
    changePage(_change);
  };
  return (
    <div>
      <button
        className="pagination-btn"
        onClick={handlePreviousClick}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {generatePageNumber().map((buttonIndex) => (
        <button
          key={buttonIndex}
          className={`pagination-btn ${
            buttonIndex === currentPage ? "active" : ""
          }`}
          onClick={() => handlePageonClick(buttonIndex)}
        >
          {buttonIndex}
        </button>
      ))}
      <button
        className="pagination-btn"
        onClick={handleNextClick}
        disabled={currentPage === totalPage}
      >
        Next
      </button>
    </div>
  );
}

Pagination.propTypes = {
  changePage: PropTypes.func.isRequired,
  totalPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};
