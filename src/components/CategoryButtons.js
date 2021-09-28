import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router';
import { fetchRecipes } from '../services';
import { MainContext } from '../context/Provider';

const MAX_INDEX = 5;
let data = [];

function CategoryButtons() {
  const [listCategory, setListCategory] = useState([]);
  const location = useLocation();

  const { setRecipes, setToggle, toggle } = useContext(MainContext);

  async function handleClick({ target }) {
    const { textContent } = target;

    // const listButtons = document.getElementsByClassName('button-category');
    // const result = Array.from(listButtons)
    //   .filter((element) => element.innerText !== target.innerText);

    if (toggle !== target.innerText) {
      setToggle(target.innerText);
      // setToggle(false);
      // result.forEach((element) => {
      //   element.disabled = true;
      // });
      switch (location.pathname) {
      case '/bebidas':
        data = await fetchRecipes(textContent, 'category', '/');
        setRecipes(data);
        break;
      case '/comidas':
        data = await fetchRecipes(textContent, 'category', '/comidas');
        setRecipes(data);
        break;
      default:
        break;
      }
    } else {
      setToggle('');
      // setToggle(true);
      // result.forEach((element) => {
      //   element.disabled = false;
      // });
      switch (location.pathname) {
      case '/bebidas':
        data = await fetchRecipes('', 'name', '/bebidas');
        setRecipes(data);
        break;
      case '/comidas':
        data = await fetchRecipes('', 'name', '/comidas');
        setRecipes(data);
        break;
      default:
        break;
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      switch (location.pathname) {
      case '/bebidas':
        data = await fetchRecipes('list', 'list', '/');
        setListCategory(data);
        break;
      case '/comidas':
        data = await fetchRecipes('list', 'list', '/comidas');
        setListCategory(data);
        break;
      default:
        break;
      }
    };
    fetchData();
  }, []);

  async function getAllCategorys() {
    // console.log('Okkk!');
    switch (location.pathname) {
    case '/bebidas':
      data = await fetchRecipes('', 'name', '/bebidas');
      setRecipes(data);
      break;
    case '/comidas':
      data = await fetchRecipes('', 'name', '/comidas');
      setRecipes(data);
      break;
    default:
      break;
    }
  }

  return (
    <>
      {listCategory.slice(0, MAX_INDEX).map((category) => (
        <button
          key={ category.strCategory }
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ handleClick }
          className="button-category"
        >
          {category.strCategory }
        </button>

      ))}
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ getAllCategorys }
      >
        All
      </button>
    </>
  );
}

export default CategoryButtons;
