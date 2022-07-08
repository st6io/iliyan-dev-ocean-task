import { Navigate, Route, Routes } from 'react-router-dom';

import Business from '../Business';
import Businesses from '../Businesses';

const businessesPath = 'businesses';

const Router = () => (
  <Routes>
    <Route path={businessesPath} element={<Businesses />} />
    <Route path={`${businessesPath}/:businessId`} element={<Business />} />

    <Route path="*" element={<Navigate to={businessesPath} replace />} />
  </Routes>
);

export default Router;
