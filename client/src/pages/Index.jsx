import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsAuth } from '../redux/slices/auth';
import Notice from '../components/Notice';
import CheckWeather from '../components/CheckWeather/CheckWeather';
import CitiesList from '../components/CitiesList';
import axios from '../axios';

const Index = () => {
  const isAuth = useSelector(selectIsAuth);

  const [isError, setError] = React.useState(false);
  const [noticeMessage, setNoticeMessage] = React.useState('');
  const [citiesInfo, setCitiesInfo] = React.useState([]);

  const weatherInfo = true;
  const isFavoriteCity = true;
  const [dateDict, setDateDict] = React.useState({ current: '', min: '', max: '' });

  React.useEffect(() => {
    const fetchWeather = () => {
      axios
        .get('/weather/')
        .then((res) => {
          const data = res.data;
          setDateDict(data.dates);
          setCitiesInfo(data.cities);

          if (data.error_message) {
            setError(true);
            setNoticeMessage(data.error_message);
          }
        })
        .catch(() => {
          setError(true);
          setNoticeMessage('Произошла ошибка при получении данных о погоде');
        });
    };

    fetchWeather();
  }, []);

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
