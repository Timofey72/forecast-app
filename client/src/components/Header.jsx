const Header = () => {
  const isAdmin = false;
  const isAuth = false;

  return (
    <header>
      <div className='container d-flex justify-content-between align-items-center'>
        <a href='/' className='d-flex align-items-center text-decoration-none' style={{padding: '20px'}}>
          <span className='fs-3'>Прогноз погоды</span>
        </a>
        <nav className='d-none d-md-flex' style={{marginRight: '-300px'}}>
          {isAdmin && (
            <a
              className='me-3 link-body-emphasis text-decoration-none fs-5'
              href="{% url 'graph-admin' %}">
              График
            </a>
          )}
          <a className='me-3 link-body-emphasis text-decoration-none fs-5' href='#main'>
            Главная
          </a>
          <a className='me-3 link-body-emphasis text-decoration-none fs-5' href='#info'>
            Информация
          </a>
          <a className='me-3 link-body-emphasis text-decoration-none fs-5' href='#support'>
            Поддержка
          </a>
          <a className='me-3 link-body-emphasis text-decoration-none fs-5' href='#prices'>
            Цены
          </a>
        </nav>
        <div className='d-flex' style={{marginRight: '-70px'}}>
          {isAuth ? (
            <>
              <a href='#profile'>
                <button type='button' className='button me-3 py-2 w-30 fs-5'>
                  Профиль
                </button>
              </a>
              <form method='POST'>
                <button type='submit' className='button me-3 py-2 w-30 fs-5'>
                  Выйти
                </button>
              </form>
            </>
          ) : (
            <>
              <a href='#register'>
                <button type='button' className='button me-3 py-2 w-30 fs-5'>
                  Регистрация
                </button>
              </a>
              <a href='#login'>
                <button type='button' className='button py-2 fs-5'>
                  Вход
                </button>
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
