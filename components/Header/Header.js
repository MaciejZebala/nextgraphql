import React from 'react';
import PropsTypes from 'prop-types';
// import '../Header/header.scss';

const Header = ({ signOut, userName, picture }) => {
  return (
    <nav className="nav">
      <div className="nav__userInfo">
        <img className="nav__userImg" src={picture} alt={userName}></img>
        <p className="nav__userName">{userName}</p>
      </div>
      <button className="nav__logout" onClick={signOut}>
        Wyloguj
      </button>
    </nav>
  );
};

Header.propTypes = {
  signOut: PropsTypes.func.isRequired,
  userName: PropsTypes.string,
  picture: PropsTypes.string
};

export default Header;
