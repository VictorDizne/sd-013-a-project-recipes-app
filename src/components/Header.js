import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const path = useLocation().pathname.replace('/', '');
  const pathGrande = path.replace(/\//g, ' ').replace(/-/g, ' ').replace('comidas ', '')
    .replace('bebidas ', '')
    .replace('area', 'Origem');
  console.log(path);
  console.log(pathGrande);
  const maxChar = 14;
  // const maxStringsChar = 29;
  const formataNome = () => (
    path.length > maxChar
      ? pathGrande
        .toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, (l) => l.toUpperCase())
      : path.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, (l) => l.toUpperCase())
  );

  return (
    <div>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
      </Link>
      <h1 data-testid="page-title">{formataNome()}</h1>
      {
        path.length > maxChar || path.toLocaleLowerCase().includes('explorar')
        || path.toLocaleLowerCase().includes('perfil')
        // || path.toLocaleLowerCase().includes('explorar origem')
          ? null
          : (
            <Link to="/explorar/bebidas">
              <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
            </Link>
          )
      }
    </div>
  );
}

export default Header;
