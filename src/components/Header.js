import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "../images/searchIcon.svg";
import profileIcon from "../images/profileIcon.svg";

const Header = () => {
  return (
    <header>
      <Link to="/profile">
        <img src={profileIcon} alt="searchIcon" data-testid="search-top-btn" />
      </Link>
      <h3 data-testid="page-title">Comidas</h3>
      <Link to="/search">
        <img src={SearchIcon} alt="searchIcon" data-testid="profile-top-btn" />
      </Link>
    </header>
  );
};

export default Header;
