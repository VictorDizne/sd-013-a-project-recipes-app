import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMealAreas, fetchMealByArea, fetchMealsByQuery } from '../../services/API';
import { Header, Footer } from '../../components/General';

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
        <select onChange={ (e) => setSelectedArea(e.target.value) }>
          <option value="All">All</option>
          {areas.map((area) => (
            <option key={ area.strArea } value={ area.strArea }>
              {area.strArea}
            </option>
          ))}
        </select>
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoodsByArea;
