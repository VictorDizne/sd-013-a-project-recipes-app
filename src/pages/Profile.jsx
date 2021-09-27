import React from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Footer, Button } from '../components/index'

function Profile{

  const getUserEmail = () => {
    if (localStorage.getItm('user')) {
      return JSON.parse(localStorage.getItem('user'));
    }
  }
  
  const history = useHistory();

  return (
    <div>
      <Header title="Perfil" />
      <Button
        className="doneRecipes"
        type="button"
         
      />
      <h1></h1>
      <Button />
    </div>
  );

}

export default Profile;
