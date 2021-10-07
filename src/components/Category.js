import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../Context/Context';
import { handleCategorySelect } from '../services/GetAPICategory';

const maxCategory = 4;

function Category() {
  const { category, setData, backupData } = useContext(Context);
  const [toggle, setToggle] = useState(false);

  const { pathname } = useLocation();

  const changeCategory = async ({ target }) => {
    if (toggle) {
      await setData(backupData);
      setToggle(false);
    } else {
      const result = await handleCategorySelect(pathname, target.value);
      await setData(result);
      setToggle(true);
    }
  };

  const filterByAll = () => {
    setData(backupData);
  };

  return (
    <div>
      { category.filter((el, i) => (i <= maxCategory ? el : false))
        .map(({ strCategory }) => (
          <button
            value={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            type="button"
            key={ strCategory }
            onClick={ changeCategory }
          >
            { strCategory }
          </button>))}
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ filterByAll }
        value="All"
      >
        All
      </button>
    </div>
  );
}

export default Category;
