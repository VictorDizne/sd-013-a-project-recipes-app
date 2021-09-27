import React, { useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import recipeContext from '../context';

function ComponentDetails() {
  const { dataForFetch: { currentPage }, handleCurrentPage,
    recipeList, fetchDetails } = useContext(recipeContext).ContextDetails;

  const { id } = useParams();
  const firstRender = useRef(true);

  useEffect(() => {
    handleCurrentPage();
  }, []);

  useEffect(() => {
    if (!firstRender.current) {
      fetchDetails(currentPage, 'lookup', 'i', id);
    } else {
      firstRender.current = false;
    }
  }, [currentPage]);

  console.log(recipeList);

  return (
    <div>
      <h1>Details</h1>
    </div>
  );
}

export default ComponentDetails;
