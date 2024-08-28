import React from "react";
import {
  ADD_MOVIE_TO_WATCHED,
  ADD_MOVIE_TO_WATCHLIST,
  REMOVE_FROM_WATCHED,
  REMOVE_FROM_WATCHLIST,
} from "./Types";

export function Reducer(state, action) {
  switch (action.type) {
    case ADD_MOVIE_TO_WATCHLIST:
      return {
        ...state,
        watchList: [action.payload, ...state.watchList],
      };
    case ADD_MOVIE_TO_WATCHED:
      return {
        ...state,
        watched: [action.payload, ...state.watched],
      };
    case REMOVE_FROM_WATCHLIST:
      return {
        ...state,
        watchList: state.watchList.filter(
          (movie) => movie.id !== action.payload.id
        ),
      };
    case REMOVE_FROM_WATCHED:
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie.id !== action.payload.id
        ),
      };

    default:
      break;
  }
}
