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

  const [isLoading, setLoading] = React.useState(true);
  const [isError, setError] = React.useState(false);
  const [noticeMessage, setNoticeMessage] = React.useState('');
  const [citiesInfo, setCitiesInfo] = React.useState([]);
  const [city, setCity] = React.useState('');
  const [prediction, setPrediction] = React.useState({});

  const isFavoriteCity = true;
  const [dateDict, setDateDict] = React.useState({ current: '', min: '', max: '' });

  const setFetchError = () => {
    setError(true);
    setNoticeMessage('Произошла ошибка при получении данных о погоде');
  };

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
          setFetchError();
        })
        .finally(() => setLoading(false));
    };

    fetchWeather();
  }, []);

  const onSubmitWeatherForm = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append('city', city);
    console.log('Date format:', dateDict.current);
    formdata.append('date', dateDict.current);

    axios
      .post('/weather/', formdata)
      .then((res) => {
        setPrediction(res.data.prediction);
      })
      .catch(() => {
        setFetchError();
      });
  };

  if (!isAuth) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <Notice isError={isError} message={noticeMessage} />

        <CheckWeather
          city={city}
          setCity={setCity}
          prediction={prediction}
          date={dateDict}
          setDateDict={setDateDict}
          isFavoriteCity={isFavoriteCity}
          onSubmitForm={onSubmitWeatherForm}
        />

        <CitiesList isLoading={isLoading} cities={citiesInfo} />
      </div>
    </div>
  );
};

export default Index;
