import React from 'react';
import SearchBar from '../SearchBar/SearchBar';

const Header = ({ signOut, userName, picture }) => {
  return (
    <nav className="nav">
      <div className="nav__userInfo">
        <img className="nav__userImg" src={picture} alt={userName}></img>
        <a className="nav__userName" href="/">
          {userName}
        </a>
      </div>
      <SearchBar />
      <button className="nav__logout" onClick={signOut}>
        Wyloguj
      </button>
    </nav>
  );
};

export default Header;
