import React from "react";
import { Link } from "react-router-dom";
import { PlayCircleOutlined } from "@ant-design/icons";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <PlayCircleOutlined className="logo-icon" />
          <span className="logo-text">MovieApp</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
