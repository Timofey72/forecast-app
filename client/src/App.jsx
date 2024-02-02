import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Index from './pages/Index';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Index />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
