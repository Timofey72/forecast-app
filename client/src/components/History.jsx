import React from 'react';
import { Link } from 'react-router-dom';

import axios from '../axios';

const History = () => {
  const [predictions, setPredictions] = React.useState([]);
  const [dateValue, setDateValue] = React.useState('2024-02-02');

  const fetchPredictions = () => {
    axios
      .get('/weather/prediction/')
      .then((res) => setPredictions(res.data))
      .catch((err) => console.log(`Error: ${err}`));
  };

  React.useEffect(() => {
    fetchPredictions();
  }, []);

  const onClickDelete = (pred_id) => {
    axios
      .delete(`/weather/prediction/${pred_id}`)
      .then(() => fetchPredictions())
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', width: '200px', marginTop: '40px' }}>
        {predictions.length >= 10 && (
          <Link to='/graph' style={{ textShadow: 'none' }} name='send' className='btn btn-warning'>
            График прогнозов
          </Link>
        )}
        <Link
          to='/favorites'
          style={{ marginTop: '10px', textShadow: 'none' }}
          name='send'
          className='btn btn-warning'>
          Избранное
        </Link>
      </div>
      <h3 style={{ marginTop: '10px' }}>История запросов:</h3>

      {predictions.length > 0 ? (
        <>
          <form action="{% url 'filter-forecast' %}" className='filter-forecast' method='POST'>
            <div className='form-floating'>
              <input
                type='date'
                id='date'
                name='date'
                value={dateValue}
                min='2024-01-02'
                max='2024-03-02'
                onChange={(e) => setDateValue(e.target.value)}
              />
            </div>

            <input type='submit' name='send' value='Применить' className='btn btn-warning' />
            <a
              href="{% url 'filter-forecast' %}"
              className='btn btn-warning'
              style={{ textShadow: 'none' }}>
              Сбросить
            </a>
          </form>
          {predictions.map((pred) => (
            <div key={pred.id} className='alert alert-warning'>
              <div className='row'>
                <div className='col-9'>
                  <button
                    onClick={() => onClickDelete(pred.id)}
                    className='button'
                    style={{ position: 'absolute', right: '20px' }}>
                    <i className='fa-solid fa-trash'> </i>
                  </button>
                  <b>Город:</b> {pred.city_id.name}
                  <br />
                  <b>Дата:</b> {pred.date}
                  <br />
                  <b>Осадки:</b> {pred.precipitation_type.name}
                  <br />
                  <b>Вероятность осадков:</b> {pred.precipitation_probability}%
                  <br />
                  <b>Вероятность осадков от ИИ:</b> {pred.precipitation_probability_ai}%
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>Вы еще не делали запросов.</p>
      )}
    </>
  );
};

export default History;
