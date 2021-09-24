import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMealByArea } from '../../services/API';
import { Header, Footer } from '../../components/General';

function ExploreFoodsByArea() {
  const [areaList, setAreaList] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect((area) => {
    (fetchMealByArea(dispatch, area));
    setLoading(false);
  }, [setAreaList]);

  const handleChange = (area) => {
    fetchMealByArea(dispatch, area);
    setLoading(false);
  };

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <Header title="Explorar Origem" search />
      <div>
        <select onChange={ (e) => handleChange(e.target.value) }>
          <option value="All">All</option>
          {areaList.map((area) => (
            <option key={ area.strArea } value={ area.strArea }>
              { area.srtArea }
            </option>
          ))}
        </select>
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoodsByArea;
