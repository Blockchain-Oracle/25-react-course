import React, { useState } from "react";
import { MovieContext } from "../../context/MovieContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faStar,
  faTimes,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import "./movieCard.css";

export default function MovieCard() {
  const {
    movies,
    isLoading,
    handleAddToWatchList,
    handleWatched,
    handleRemoveFromWatchList,
    handleRemoveFromWatched,
    state,
  } = React.useContext(MovieContext);
  const baseURL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="movie-grid">
      {isLoading ? (
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCardItem
                key={movie.id}
                movie={movie}
                baseURL={baseURL}
                handleAddToWatchList={handleAddToWatchList}
                handleWatched={handleWatched}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
                handleRemoveFromWatched={handleRemoveFromWatched}
                state={state}
              />
            ))
          ) : (
            <div className="no-movie-found">
              <h3>No movies found</h3>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function MovieCardItem({
  movie,
  baseURL,
  handleAddToWatchList,
  handleWatched,
  handleRemoveFromWatchList,
  handleRemoveFromWatched,
  state,
}) {
  const [showOverlay, setShowOverlay] = useState(false);
  const isInWatchList = state.watchList.some((item) => item.id === movie.id);
  const isWatched = state.watched.some((item) => item.id === movie.id);

  return (
    <div
      className="movie-card"
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <img
        src={`${baseURL}${movie.poster_path}`}
        alt={movie.original_title}
        className="movie-img"
      />
      {showOverlay && (
        <div className="movie-overlay">
          <h3 className="movie-title">{movie.original_title}</h3>
          <div className="movie-info">
            <span className="movie-rating">
              <FontAwesomeIcon icon={faStar} /> {movie.vote_average}
            </span>
            <span className="movie-year">
              {movie.release_date?.split("-")[0]}
            </span>
          </div>
          <p className="movie-overview">{movie.overview}</p>
          <div className="movie-actions">
            <button
              onClick={() =>
                isInWatchList
                  ? handleRemoveFromWatchList(movie)
                  : handleAddToWatchList(movie)
              }
              className="btn-action btn-watchlist"
            >
              <FontAwesomeIcon icon={isInWatchList ? faTimes : faPlus} />
              {isInWatchList ? "Remove from Watchlist" : "Add to Watchlist"}
            </button>
            <button
              onClick={() =>
                isWatched
                  ? handleRemoveFromWatched(movie)
                  : handleWatched(movie)
              }
              className="btn-action btn-watched"
            >
              <FontAwesomeIcon icon={isWatched ? faEyeSlash : faEye} />
              {isWatched ? "Remove from Watched" : "Add to Watched"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
