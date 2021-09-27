import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMealAreas, fetchMealByArea, fetchMealsByQuery } from '../../services/API';
import { Header, Footer } from '../../components/General';
import RecipesList from '../../components/ExploreByArea/RecipesList';

function ExploreFoodsByArea() {
  const areas = useSelector((state) => state.api.explore);
  const [selectedArea, setSelectedArea] = useState('All');
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMealAreas(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (selectedArea === 'All') {
      fetchMealsByQuery('s', '', dispatch);
    } else {
      fetchMealByArea(dispatch, selectedArea);
    }
  }, [dispatch, selectedArea]);

  if (!areas) return null;
  return (
    <>
      <Header title="Explorar Origem" search />
      <div>
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ (e) => setSelectedArea(e.target.value) }
        >
          <option data-testid="All-option" value="All">All</option>
          {areas.map((area) => (
            <option
              data-testid={ `${area.strArea}-option` }
              key={ area.strArea }
              value={ area.strArea }
            >
              {area.strArea}
            </option>
          ))}
        </select>
      </div>
      <div>
        <RecipesList type="Meal" />
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoodsByArea;
