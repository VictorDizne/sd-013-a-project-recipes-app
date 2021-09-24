/* import React, { useState, useEffect } from 'react';

const S = () => {
  const [foodCategories, setFoodCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => setFoodCategories(await fetchByCategoryFood());
    fetchData();
  }, []);

  const MAX_NUMBER = 5;

  return (
    <div>
      {foodCategories
        .filter((category, index) => index < MAX_NUMBER)
        .map((category, index) => (
          <button
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            type="button"
          >
            {category.strCategory}
          </button>
        ))}
    </div>
  );
};

export default SearchFoodCategories; */
