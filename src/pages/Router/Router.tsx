import { Navigate, Route, Routes } from 'react-router-dom';

import BusinessPage from '../BusinessPage';
import BusinessesPage from '../BusinessesPage';

const Router = () => (
  <Routes>
    <Route path="businesses" element={<BusinessesPage />} />
    <Route path="business" element={<BusinessPage />} />
    <Route path="*" element={<Navigate to="businesses" replace />} />
  </Routes>
);

export default Router;
