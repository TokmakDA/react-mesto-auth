import React from 'react';
import logo from './../images/mesto-logo-white.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ account, logOut, isLoggedIn }) {
  const location = useLocation();
  const handleClick = () => {
    logOut();
  };

  console.log(account);

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <nav className='header__nav-bar'>
      {isLoggedIn && (
        <div className="header__user-menu">
          <p className="header__user-info">{account}</p>
          <Link className="header__link header__link_exit" onClick={handleClick}>
            Выйти
          </Link>
        </div>
      )}

      {location.pathname === '/sign-up' && (
        <Link to="../sign-in" className="header__link">
          Войти
        </Link>
      )}
      {location.pathname === '/sign-in' && (
        <Link to="../sign-up" className="header__link">
          Регистрация
        </Link>
      )}
      </nav>
    </header>
  );
}

export default Header;
