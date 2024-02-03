const Login = () => {
  const isError = false;
  return (
    <div className='center-container'>
      <form className='center-form' method='POST'>
        <h1 style={{ marginLeft: '220px', marginBottom: '70px' }}> Вход </h1>

        <div className='form-group'>
          <label htmlFor='login'>Введите логин</label>
          <input
            type='text'
            name='login'
            className='form-control'
            id='login'
            aria-describedby='usernameHelp'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Введите пароль</label>
          <input type='password' name='password' className='form-control' id='password' required />
        </div>

        {isError && <p style={{ margin: '30px 0 0 0', color: 'red' }}>произошла ошибка</p>}

        <button type='submit' className='btn btn-outline-warning'>
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
