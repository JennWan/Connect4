import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo"><img src="./events/ARC'TERYX.png" alt="" /></Link>
      <nav className="nav-links">
        <Link to="/events" className="event">Events</Link>
        <Link to="/groups" className="forum">Forum</Link>
      </nav>
    </header>
  );
}
