import React, { useState, useEffect } from "react";
import { MovieContext } from "../../context/MovieContext";
import "./searchBar.css";

export default function SearchBar() {
  const { updateParams } = React.useContext(MovieContext);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim() === "") {
        updateParams(null);
      } else {
        updateParams(searchTerm);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, updateParams]);

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search for a movie"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
    </div>
  );
}
