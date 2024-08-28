import React, { useContext, useState } from "react";
import { MovieContext } from "../../context/MovieContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./watched.css";

export default function Watched() {
  const { state, handleRemoveFromWatched } = useContext(MovieContext);
  const baseURL = "https://image.tmdb.org/t/p/w500";

  const WatchedItem = ({ movie }) => {
    const [showOverlay, setShowOverlay] = useState(false);

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
                onClick={() => {
                  handleRemoveFromWatched(movie);
                  setShowOverlay(false);
                }}
                className="btn-action btn-remove"
              >
                <FontAwesomeIcon icon={faTimes} /> Remove
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="movie-grid">
      <header className="watched-header">Your Watched Movies</header>
      {state?.watched && state.watched.length > 0 ? (
        state.watched.map((watchedItem) => (
          <WatchedItem key={watchedItem.id} movie={watchedItem} />
        ))
      ) : (
        <div className="no-movie-found">
          <h3>No movies in your watched list</h3>
          <button className="btn-action">Browse Movies</button>
        </div>
      )}
    </div>
  );
}
