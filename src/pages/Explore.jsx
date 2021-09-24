import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import '../styles/explore.css';

function Explore() {
  const enableSearch = (
    useSelector(({ functionsReducer }) => functionsReducer.enableSearch)
  );

  const history = useHistory();

  const handleExplore = ({ target }) => {
    const text = target.innerHTML;
    if (text === 'Explorar Comidas') {
      history.push('/explorar/comidas');
    }
    if (text === 'Explorar Bebidas') {
      history.push('/explorar/bebidas');
    }
  };

  return (
    <div>
      <Header />
      {enableSearch && <SearchBar />}
      <div className="explore-container">
        <button
          type="button"
          className="explore-button"
          data-testid="explore-food"
          onClick={ handleExplore }
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          className="explore-button"
          data-testid="explore-drinks"
          onClick={ handleExplore }
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
