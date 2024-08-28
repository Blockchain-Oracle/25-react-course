import { useState } from "react";
import Pagination from "./Pagination";
import PropTypes from "prop-types";

export default function PaginationItems({ itemsPerPage = 10 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const dummyData = Array.from({ length: itemsPerPage }, (_, index) => {
    return { id: `${index + 1}`, product: `product ${index + 1}` };
  });
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const currentItems = dummyData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(dummyData.length / itemsPerPage);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const listGroup = () => {
    const listItems = currentItems.map((item) => {
      return <li key={item.id}>{item.product}</li>;
    });
    return <ul>{listItems}</ul>;
  };
  return (
    <>
      <h1>Pagination{currentPage}</h1>
      {listGroup()}
      <Pagination
        changePage={changePage}
        currentPage={currentPage}
        totalPage={totalPages}
      />
    </>
  );
}

PaginationItems.propTypes = {
  itemsPerPage: PropTypes.number,
};
