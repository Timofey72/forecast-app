import React from 'react';
import { Link, Navigate } from 'react-router-dom';

import axios from '../axios';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/slices/auth';

const Favorites = () => {
  const isAuth = useSelector(selectIsAuth);
  const [cities, setCities] = React.useState([]);

  React.useEffect(() => {
    const fetchCities = () => {
      axios.get('/weather/city/').then((res) => setCities(res.data));
    };
    if (isAuth) {
      fetchCities();
    }
  }, []);

  if (!isAuth) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='profile-form' style={{ margin: '100px auto 0', minHeight: '400px' }}>
      <h2 style={{ textAlign: 'center', fontSize: '35px' }}>Избранное</h2>
      {cities.length !== 0 ? (
        cities.map((city) => (
          <Link
            key={city.id}
            style={{ textDecoration: 'none', textShadow: 'none' }}
            to={`/favorites/${city.id}`}>
            <div
              style={{ cursor: 'pointer', width: '400px', margin: '10px auto 20px' }}
              className='alert alert-warning'>
              <button className='button' style={{ position: 'absolute', right: '20px' }}>
                <i className='fa-solid fa-trash' />
              </button>
              <h4 style={{ margin: '0' }}>Город: {city.name}</h4>
            </div>
          </Link>
        ))
      ) : (
        <h4 style={{ textAlign: 'center', marginTop: '50px' }}>
          Вы не добавили не одного города в избранное
        </h4>
      )}
    </div>
  );
};

export default Favorites;
