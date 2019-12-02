import React from 'react';
import { Link } from '@reach/router';

function NavBar() {
  return (
    <nav>
      <Link to="/">Search</Link>
      <Link to="/portfolio">Portfolio</Link>
    </nav>
  );
}

export default NavBar;
