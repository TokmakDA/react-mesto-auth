import React from 'react';

const UserBar = ({ account, logOut }) => {
  const handleClick = () => {
    logOut();
  };

  return (
    <div className="header__user-menu">
      <p className="header__user-info">{account}</p>
      <button className="header__button-exit" onClick={handleClick}>
        Выйти
      </button>
    </div>
  );
};

export default UserBar;
