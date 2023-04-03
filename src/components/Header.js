import React from 'react';
import logo from './../images/mesto-logo-white.svg';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
    </header>
  );
}

export default Header;
