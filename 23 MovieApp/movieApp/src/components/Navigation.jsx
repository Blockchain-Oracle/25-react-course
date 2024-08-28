import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import "./navigation.css";

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navigation">
      <div className="menu-icon" onClick={toggleMenu}>
        <MenuOutlined />
      </div>
      <ul className={isMenuOpen ? "nav-links open" : "nav-links"}>
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/tv-shows"
            className={location.pathname === "/tv-shows" ? "active" : ""}
          >
            TV Shows
          </Link>
        </li>
        <li>
          <Link
            to="/movies"
            className={location.pathname === "/movies" ? "active" : ""}
          >
            Movies
          </Link>
        </li>
        <li>
          <Link
            to="/watchlist"
            className={location.pathname === "/watchlist" ? "active" : ""}
          >
            My List
          </Link>
        </li>
        <li>
          <Link
            to="/watched"
            className={location.pathname === "/watched" ? "active" : ""}
          >
            Watched
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
