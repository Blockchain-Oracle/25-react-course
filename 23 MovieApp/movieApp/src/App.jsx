import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import MovieApp from "./components/MovieApp";
import Watchlist from "./components/WatchListAndWatched/WatchList.jsx";
import Watched from "./components/WatchListAndWatched/Watched.jsx";
import { MovieProvider } from "./context/MovieContext";
import Navigation from "./components/Navigation.jsx";
import TVShows from "./components/Tvshows/TVShows.jsx";

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<MovieApp />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/watched" element={<Watched />} />
          <Route path="/tv-shows" element={<TVShows />} />
          <Route path="/movies" element={<MovieApp />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function Root() {
  return (
    <MovieProvider>
      <App />
    </MovieProvider>
  );
}
