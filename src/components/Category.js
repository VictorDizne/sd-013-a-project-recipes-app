import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../Context/Context';
import { handleCategorySelect } from '../services/GetAPICategory';

const maxCategory = 4;

function Category() {
  const { category, setData } = useContext(Context);

  // const [categorySelect, seteCategorySelect] = useState('');
  // const [pathState, setPathState] = useState('');

  const { pathname } = useLocation();

  const changeCategory = async ({ target }) => {
    const result = await handleCategorySelect(pathname, target.value);
    console.log(pathname);
    await setData(result);
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
    </div>
  );
}

export default Category;
