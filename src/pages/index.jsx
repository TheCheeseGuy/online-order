import React from 'react';
import { useNavigate } from 'react-router-dom';

function Index() {
  const navigate = useNavigate();

  const goToLunchPage = () => {
    navigate('/lunch');
  };

  const goToAsaPage = () => {
    navigate('/asa')
  }

  return (
    <div>
      <h1>Welcome to the Index Page</h1>
      <div className='row'>
        <div className="col">
        <button onClick={goToLunchPage}>Go to Lunch Page</button>
        </div>
        <div className="col">
          <button onClick={(goToAsaPage)}>Go to ASA Page</button>
        </div>
      </div>
      
    </div>
  );
}

export default Index;