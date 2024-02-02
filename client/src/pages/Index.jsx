import React from "react";

const Index = () => {
  const isError = false;
  const addFavorite = false;
  const removeFavorite = false;
  const isWeatherInfo = true;
  const isFavoriteCity = true;
  const citiesInfo = {'test': 'test'};
  const [dateValue, setDateValue] = React.useState('2024-02-02');

  return (
    <div className='container mt-5'>
      <div className='row'>
        {isError && (
          <div className='alert alert-danger' role='alert'>
            Не удалось получить информацию о погоде по этому городу.
          </div>
        )}

        {addFavorite && (
          <div className='alert alert-success alert-dismissible fade show' role='alert'>
            Вы добавили в избранное город <strong>Москва</strong>.
            <a
              href="#index"
              className='btn-close'
              style={{marginTop: '4px'}}
              data-bs-dismiss='alert'
              aria-label='Close'></a>
          </div>
        )}

        {removeFavorite && (
          <div className='alert alert-danger alert-dismissible fade show' role='alert'>
            Вы удалили из избранного город <strong>Москва</strong>.
            <a
              href="{% url 'home' %}"
              className='btn-close'
              style={{marginTop: '4px'}}
              data-bs-dismiss='alert'
              aria-label='Close'></a>
          </div>
        )}

        <div style={{margin: '0'}} className='center-form col-5 offset-1'>
          <h1>Погода в вашем городе</h1>
          <form method='post'>
            <label htmlFor='city'>Город:</label>

            <div className='form-floating' style={{width: '50%'}}>
              <input type='date' id='date' name='date' value={dateValue} min='2024-01-02' max='2024-03-02' onChange={(e) => setDateValue(e.target.value)} />
            </div>

            <input type='submit' name='send' value='Узнать' className='mt-2 btn btn-warning' />
          </form>

          {isWeatherInfo && (
            <>
              <h2 style={{marginTop: '20px', width: '600px'}}>Информация о погоде 23.12.2023</h2>
              <div className='alert alert-warning'>
                <div className='row'>
                  <div className='col-9'>
                    <b>Город:</b> Москва
                    <br />
                    <b>Температура:</b> -10.3<sup>o</sup>
                    <br />
                    <b>Осадки:</b> снег
                    <br />
                    <b>Вероятность осадков:</b> 75%
                    <br />
                    <b>Вероятность осадков от ИИ:</b> 45%
                  </div>
                  <div className='col-2 offset-1'>
                    <img src='icon' alt='Фото погоды' className='img-thumbnail' />
                  </div>
                  <form method='POST'>
                    <input type='hidden' value='Moskow' id='city' name='city' />

                    {isFavoriteCity ? (
                      <>
                        <input type='hidden' value='delete' id='delete' name='delete' />
                        <button id='favorite-button' className='favorite_button' type='submit'>
                          <i className='fa-solid fa-star' style={{color: 'orange'}}></i>
                        </button>
                      </>
                    ) : (
                      <button id='favorite-button' className='favorite_button' type='submit'>
                        <i className='fa-regular fa-star' style={{color: 'orange'}}></i>
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
        <div style={{width: '470px', height: '100%'}} className='center-form col-4 offset-1'>
          <h2 style={{fontSize: '30px'}}>Информация о погоде сейчас</h2>
          {Object.keys(citiesInfo).length !== 0 ? (
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
            <p style={{marginTop: '50px', textAlign: 'center'}}>Вы еще не делали запросов</p>
          )}
        </div>
      </div>
    </div>
  );
};


export default Index;