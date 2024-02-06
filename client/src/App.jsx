import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchAuthMe } from './redux/slices/auth';

import MainLayout from './layouts/MainLayout/MainLayout';
import Index from './pages/Index';
import NotFound from './pages/NotFound/NotFound';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    dispatch(fetchAuthMe()).finally(() => setLoading(false));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Index />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
