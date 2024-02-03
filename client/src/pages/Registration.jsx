const Registration = () => {
  const isError = false;
  return (
    <div className='center-container'>
      <form className='center-form' method='POST'>
        <h1 style={{ marginLeft: '220px', marginBottom: '70px' }}> Регистрация </h1>

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
          <label htmlFor='password1'>Введите пароль</label>
          <input type='password' name='password1' className='form-control' id='password1' required />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Введите пароль еще раз</label>
          <input type='password' name='password2' className='form-control' id='password2' />
        </div>

        {isError && <p style={{ margin: '30px 0 0 0', color: 'red' }}>Произошла ошибка</p>}

        <button type='submit' className='btn btn-outline-warning'>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Registration;
