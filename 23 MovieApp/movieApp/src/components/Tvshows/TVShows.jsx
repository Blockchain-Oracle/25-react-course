import React, { useContext, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { MovieContext } from "../../context/MovieContext";

const TVShows = () => {
  const { updateParams, movies: tvShows, isLoading } = useContext(MovieContext);

  useEffect(() => {
    updateParams("show");
  }, [updateParams]);
  return (
    <div className="tv-shows-container">
      <h2>Popular TV Shows</h2>
      {isLoading ? (
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      ) : tvShows.length > 0 ? (
        <div className="movie-grid">
          <MovieCard movie={tvShows} />
        </div>
      ) : (
        <div className="no-movie-found">
          <h3>No TV shows found</h3>
        </div>
      )}
    </div>
  );
};

export default TVShows;
