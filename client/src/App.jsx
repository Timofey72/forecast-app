import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout/MainLayout';
import Index from './pages/Index';
import NotFound from './pages/NotFound/NotFound';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Index />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
