import React from 'react';
import PropsTypes from 'prop-types';

const Header = ({ signOut, userName, picture }) => {
  return (
    <nav>
      <div>
        <p>{userName}</p>
        <img src={picture} alt={userName}></img>
      </div>
      <button onClick={signOut}>Wyloguj</button>
    </nav>
  );
};

Header.propTypes = {
  signOut: PropsTypes.func.isRequired,
  userName: PropsTypes.string,
  picture: PropsTypes.string
};

export default Header;
