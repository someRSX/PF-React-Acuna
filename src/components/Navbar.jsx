import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './navbar.css';

function Navbar() {
  const { getTotalItems } = useCart();

  return (
    <nav className="navbar">
      {}
      <div className="navbar-left">
        <ul className="navbar-links">
          <li><Link to="/category/celulares"> CELULARES </Link></li>
          <li><Link to="/category/computadores"> COMPUTADORAS </Link></li>
          <li><Link to="/category/electrodomesticos"> ELECTRODOMÉSTICOS </Link></li>
        </ul>
      </div>

      {}
      <div className="navbar-center">
        <Link to="/" className="navbar-brand"> MI TIENDA RANDOM </Link>
      </div>

      {}
      <div className="navbar-cart">
        <Link to="/cart">
          <i className="fas fa-shopping-cart"></i>
          <span> {getTotalItems()} </span>  {}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;