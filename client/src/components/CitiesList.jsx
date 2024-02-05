import React from 'react';

const CitiesList = ({ cities }) => {
  return (
    <div style={{ width: '470px', height: '100%' }} className='center-form col-4 offset-1'>
      <h2 style={{ fontSize: '30px' }}>Информация о погоде сейчас</h2>
      {Object.keys(cities).length !== 0 ? (
        <div className='alert alert-warning'>
          <div className='row'>
            <div className='col-9'>
              <b>Город:</b> Москва
              <br />
              <b>Температура:</b> -4<sup>o</sup>
              <br />
              <b>Осадки:</b> дождь
              <br />
              <b>Вероятность осадков:</b> 23%
              <br />
            </div>
            <div className='col-2 offset-1'>
              <img src='icon' alt='Фото погоды' className='img-thumbnail' />
            </div>
          </div>
        </div>
      ) : (
        <p style={{ marginTop: '50px', textAlign: 'center' }}>Вы еще не делали запросов</p>
      )}
    </div>
  );
};

export default CitiesList;
