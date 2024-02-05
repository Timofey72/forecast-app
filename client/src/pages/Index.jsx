import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsAuth } from '../redux/slices/auth';
import Notice from '../components/Notice';
import CheckWeather from '../components/CheckWeather/CheckWeather';
import CitiesList from '../components/CitiesList';

const Index = () => {
  const isAuth = useSelector(selectIsAuth);

  const [isError, setError] = React.useState(false);
  const [noticeMessage, setNoticeMessage] = React.useState('');

  const weatherInfo = true;
  const isFavoriteCity = true;
  const citiesInfo = { test: 'test' };
  const [dateDict, setDateDict] = React.useState({
    current: '2024-02-05',
    min: '2024-01-05',
    max: '2024-03-05',
  });

  if (!isAuth) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <Notice isError={isError} message={noticeMessage} />

        <CheckWeather
          weatherInfo={weatherInfo}
          date={dateDict}
          setDateDict={setDateDict}
          isFavoriteCity={isFavoriteCity}
        />

        <CitiesList cities={citiesInfo} />
      </div>
    </div>
  );
};

export default Index;
