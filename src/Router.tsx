import { Route, Routes } from 'react-router-dom';

import BusinessPage from './BusinessPage';
import BusinessesPage from './BusinessesPage';
import HomePage from './HomePage';

const Router = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="businesses" element={<BusinessesPage />} />
    <Route path="business" element={<BusinessPage />} />
  </Routes>
);

export default Router;
