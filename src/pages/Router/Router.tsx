import { Navigate, Route, Routes } from 'react-router-dom';

import BusinessPage from '../BusinessPage';
import BusinessesPage from '../BusinessesPage';

const businessesPath = 'businesses';

const Router = () => (
  <Routes>
    <Route path={businessesPath} element={<BusinessesPage />} />
    <Route path={`${businessesPath}/:businessId`} element={<BusinessPage />} />

    <Route path="*" element={<Navigate to={businessesPath} replace />} />
  </Routes>
);

export default Router;
