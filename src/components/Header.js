import React, { useState } from 'react';
import logo from './../images/mesto-logo-white.svg';
import { Link, useLocation } from 'react-router-dom';
import UserBar from './UserBar';
import { useResize } from '../utils/useResize';

function Header({ account, logOut, isLoggedIn }) {
  const location = useLocation();
  const [isUserBarOpen, setUserBarOpen] = useState(false);

  const { isScreen } = useResize();

  const handleClickIcon = () => {
    if (isUserBarOpen) {
      setUserBarOpen(false);
    } else {
      setUserBarOpen(true);
    }
  };

  return (
    <>
      {isUserBarOpen && !isScreen && (
        <UserBar logOut={logOut} account={account} />
      )}
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип" />
        <nav className="header__nav-bar">
          {isLoggedIn &&
            (!isScreen ? (
              <button
                className={`header__icon-menu header__icon-menu_${
                  isUserBarOpen ? 'close' : 'open'
                }`}
                onClick={handleClickIcon}
              />
            ) : (
              <UserBar logOut={logOut} account={account} />
            ))}
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
    </>
  );
}

export default Header;
