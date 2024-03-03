import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
        <h1>Fitness+</h1>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/food">Food</Link>
            <Link to="/workout">Workout</Link>
            <Link to="/profile">Profile</Link>
        </nav>
    </header>
  );
}

export default Header;
