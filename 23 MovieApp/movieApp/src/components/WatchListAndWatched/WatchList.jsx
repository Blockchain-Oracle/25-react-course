import React, { useContext, useState } from "react";
import { MovieContext } from "../../context/MovieContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./watchList.css";

export default function WatchList() {
  const { state, handleWatched, handleRemoveFromWatchList } =
    useContext(MovieContext);
  const baseURL = "https://image.tmdb.org/t/p/w500";

  const navigate = useNavigate();
  const WatchlistItem = ({ movie }) => {
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
                  handleWatched(movie);
                  handleRemoveFromWatchList(movie);
                }}
                className="btn-action btn-watched"
              >
                <FontAwesomeIcon icon={faCheck} /> Watched
              </button>
              <button
                onClick={() => {
                  handleRemoveFromWatchList(movie);
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
      <header className="watchlist-header">Your Watchlist</header>
      {state?.watchList && state.watchList.length > 0 ? (
        state.watchList.map((watchlistItem) => (
          <WatchlistItem key={watchlistItem.id} movie={watchlistItem} />
        ))
      ) : (
        <div className="no-movie-found">
          <h3>No movies in your watchlist</h3>
          <button className="btn-action" onClick={() => navigate("/")}>
            Browse Movies
          </button>
        </div>
      )}
    </div>
  );
}
