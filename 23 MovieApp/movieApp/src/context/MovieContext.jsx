import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import useDebounce from "../hooks/useDebounce";
import { Reducer } from "./Reducer";
import {
  ADD_MOVIE_TO_WATCHED,
  ADD_MOVIE_TO_WATCHLIST,
  REMOVE_FROM_WATCHED,
  REMOVE_FROM_WATCHLIST,
} from "./Types";

export const MovieContext = createContext(undefined);

export const MovieProvider = ({ children }) => {
  const [params, setParams] = useState(null);
  const { fetchMovies, isLoading, movies } = useDebounce({
    params,
    queryTime: 500,
  });

  const intialState = {
    watchList: localStorage.getItem("watchList")
      ? JSON.parse(localStorage.getItem("watchList"))
      : [],
    watched: localStorage.getItem("watched")
      ? JSON.parse(localStorage.getItem("watched"))
      : [],
  };

  React.useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(state.watchList));
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);

  const [state, dispatch] = React.useReducer(Reducer, intialState);

  const handleAddToWatchList = (movie) => {
    dispatch({
      type: ADD_MOVIE_TO_WATCHLIST,
      payload: movie,
    });
  };

  const handleWatched = (movie) => {
    dispatch({
      type: ADD_MOVIE_TO_WATCHED,
      payload: movie,
    });
  };

  const handleRemoveFromWatchList = (movie) => {
    dispatch({
      type: REMOVE_FROM_WATCHLIST,
      payload: movie,
    });
  };

  const handleRemoveFromWatched = (movie) => {
    dispatch({
      type: REMOVE_FROM_WATCHED,
      payload: movie,
    });
  };

  const updateParams = useCallback(
    (newParams) => {
      setParams(newParams);
      fetchMovies();
    },
    [fetchMovies]
  );

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        isLoading,
        // selectedMovie,
        // setSelectedMovie,
        updateParams,
        handleAddToWatchList,
        handleWatched,
        state,
        handleRemoveFromWatchList,
        handleRemoveFromWatched,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
