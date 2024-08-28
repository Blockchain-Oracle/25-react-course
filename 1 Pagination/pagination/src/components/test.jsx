import { useState } from "react";
import Pagination from "./Pagination.jsx";
import "./pagination.css";
function PaginationTest() {
  const dummyData = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `Products ${index + 1}`,
  }));

  // useEffect(() => {
  //   console.log(dummyData);
  // }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const indexoflastItem = currentPage * itemsPerPage;
  const indexofFirstItem = indexoflastItem - itemsPerPage;
  const currentlistofItems = dummyData.slice(indexofFirstItem, indexoflastItem);
  console.log(currentlistofItems, indexofFirstItem, indexoflastItem);

  const onPageChange = (_change) => {
    setCurrentPage(_change);
  };

  const paginationGroup = () => {
    const paginationlist = currentlistofItems.map((listItem) => (
      <li key={listItem.id}>{listItem.name}</li>
    ));
    return <ul className="listItems">{paginationlist}</ul>;
  };

  return (
    <>
      <h1>Pagination</h1>
      {paginationGroup()}
      <Pagination
        onPageChange={onPageChange}
        currentPage={currentPage}
        totalPages={Math.ceil(dummyData.length / itemsPerPage)}
      />
    </>
  );
}

export default PaginationTest;
