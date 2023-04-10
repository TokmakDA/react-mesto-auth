import React, { useState } from 'react';
import logo from './../images/mesto-logo-white.svg';
import { Link, Route, Routes } from 'react-router-dom';
import UserBar from './UserBar';
import { useResize } from '../hooks/useResize';

function Header({ account, logOut, isLoggedIn }) {
  // const location = useLocation();
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
      {isLoggedIn && isUserBarOpen && !isScreen && (
        <UserBar logOut={logOut} account={account} />
      )}
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип" />
        <nav className="header__nav-bar">
          <Routes>
            <Route
              exact
              path="/"
              element={
                !isScreen ? (
                  <button
                    className={`header__icon-menu header__icon-menu_${
                      isUserBarOpen ? 'close' : 'open'
                    }`}
                    onClick={handleClickIcon}
                  />
                ) : (
                  <UserBar logOut={logOut} account={account} />
                )
              }
            />
            <Route
              path="/sign-up"
              element={
                <Link to="/sign-in" className="header__link">
                  Войти
                </Link>
              }
            />
            <Route
              path="/sign-in"
              element={
                <Link to="/sign-up" className="header__link">
                  Регистрация
                </Link>
              }
            />
          </Routes>
        </nav>
      </header>
    </>
  );
}

export default Header;
