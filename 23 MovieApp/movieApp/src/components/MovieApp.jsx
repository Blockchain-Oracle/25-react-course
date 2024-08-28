import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "./MovieCard/MovieCard";
import "./MovieApp.css";

export default function MovieApp() {
  const { updateParams, movies } = React.useContext(MovieContext);

  return (
    <div className="movie-app-container">
      <SearchBar />
      <MovieCard />
    </div>
  );
}
