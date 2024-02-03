import { Link } from "react-router-dom";


const Header = () => {
  const isAdmin = false;
  const isAuth = true;

  return (
    <header>
      <div className='container d-flex justify-content-between align-items-center'>
        <Link to='/' className='d-flex align-items-center text-decoration-none' style={{padding: '20px'}}>
          <span className='fs-3'>Прогноз погоды</span>
        </Link>
        <nav className='d-none d-md-flex' style={{marginRight: '-300px'}}>
          {isAdmin && (
            <a
              className='me-3 link-body-emphasis text-decoration-none fs-5'
              href="{% url 'graph-admin' %}">
              График
            </a>
          )}
          <Link to='/' className='me-3 link-body-emphasis text-decoration-none fs-5'>
            Главная
          </Link>
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
              <Link to='/profile'>
                <button type='button' className='button me-3 py-2 w-30 fs-5'>
                  Профиль
                </button>
              </Link>
              <form method='POST'>
                <button type='submit' className='button me-3 py-2 w-30 fs-5'>
                  Выйти
                </button>
              </form>
            </>
          ) : (
            <>
              <Link to='/registration'>
                <button type='button' className='button me-3 py-2 w-30 fs-5'>
                  Регистрация
                </button>
              </Link>
              <Link to='/login'>
                <button type='button' className='button py-2 fs-5'>
                  Вход
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
