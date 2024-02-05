import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsAuth, selectUsername, fetchAuthMe } from '../redux/slices/auth';
import axios from '../axios';

const Profile = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const name = useSelector(selectUsername);
  const [username, setUsername] = React.useState(name);
  const [password, setPassword] = React.useState('');
  const [dateValue, setDateValue] = React.useState('2024-02-02');

  const [isError, setError] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');

  const isNotFound = false;

  const predictions = 10;

  const onSubmitUserForm = (e) => {
    e.preventDefault();
    setError(false);
    setErrorText('');

    const formdata = new FormData();
    if (username) formdata.append('username', username);
    if (password) formdata.append('password', password);

    axios
      .put('/user/me/', formdata)
      .then(async (res) => {
        await dispatch(fetchAuthMe());
        alert('Данные успешно обновлены')
      })
      .catch((err) => {
        setError(true);
        setErrorText('Произошла ошибка. Попробуйте еще раз.');

        const usernameError = err.response?.data?.username;
        const passwordError = err.response?.data?.password;

        if (usernameError) {
          setErrorText(usernameError);
        } else if (passwordError) {
          setErrorText(passwordError);
        }
      });
  };

  if (!isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <div className='profile-form' style={{ margin: '100px auto 0', minHeight: '600px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '35px' }}>Кабинет пользователя</h2>

        <div>
          <form onSubmit={onSubmitUserForm} method='POST'>
            <div className='form-group'>
              <label htmlFor='login'>Логин пользователя:</label>
              <input
                type='text'
                name='login'
                className='form-control'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id='login'
                aria-describedby='usernameHelp'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Введите пароль:</label>
              <input
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                name='password'
                className='form-control'
                id='password'
                value={password}
              />
            </div>
            {isError && <p className='form__error'>{errorText}</p>}
            <button className='button form__button' type='submit'>
              Обновить данные
            </button>
          </form>

          <div
            style={{ display: 'flex', flexDirection: 'column', width: '200px', marginTop: '40px' }}>
            {predictions >= 10 && (
              <a
                href="{% url 'graph' user.id %}"
                style={{ textShadow: 'none' }}
                name='send'
                className='btn btn-warning'>
                График прогнозов
              </a>
            )}
            <a
              href="{% url 'favorite' %}"
              style={{ marginTop: '10px', textShadow: 'none' }}
              name='send'
              className='btn btn-warning'>
              Избранное
            </a>
          </div>
          <h3 style={{ marginTop: '10px' }}>История запросов:</h3>

          {isNotFound && (
            <>
              <form action="{% url 'filter-forecast' %}" className='filter-forecast' method='POST'>
                <div className='form-floating'>
                  <input
                    type='date'
                    id='date'
                    name='date'
                    value='{{ date.current }}'
                    min='{{ date.min_date }}'
                    max='{{ date.max_date }}'
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
              По такой дате ничего не найдено
            </>
          )}

          {predictions > 0 ? (
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

              <div className='alert alert-warning'>
                <div className='row'>
                  <div className='col-9'>
                    <form method='POST' action="{% url 'delete-forecast' prediction.id %}">
                      <button
                        className='button'
                        style={{ position: 'absolute', right: '20px' }}
                        type='submit'>
                        <i className='fa-solid fa-trash'> </i>
                      </button>
                    </form>
                    <b>Город:</b> Москва
                    <br />
                    <b>Дата:</b> 14.02.2023
                    <br />
                    <b>Осадки:</b> нет
                    <br />
                    <b>Вероятность осадков:</b> 23%
                    <br />
                    <b>Вероятность осадков от ИИ:</b> 78%
                  </div>
                </div>
              </div>
              <div className='alert alert-warning'>
                <div className='row'>
                  <div className='col-9'>
                    <form method='POST' action="{% url 'delete-forecast' prediction.id %}">
                      <button
                        className='button'
                        style={{ position: 'absolute', right: '20px' }}
                        type='submit'>
                        <i className='fa-solid fa-trash'> </i>
                      </button>
                    </form>
                    <b>Город:</b> Москва
                    <br />
                    <b>Дата:</b> 14.02.2023
                    <br />
                    <b>Осадки:</b> нет
                    <br />
                    <b>Вероятность осадков:</b> 23%
                    <br />
                    <b>Вероятность осадков от ИИ:</b> 78%
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>Вы еще не делали запросов.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
