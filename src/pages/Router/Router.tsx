import { Navigate, Route, Routes } from 'react-router-dom';

import Business from '../Business';
import Businesses from '../Businesses';
import NotFound from '../NotFound';

export const businessesPath = 'businesses';

const Router = () => (
  <Routes>
    <Route path="/" element={<Navigate to={businessesPath} replace />} />
    <Route path={businessesPath} element={<Businesses />} />
    <Route path={`${businessesPath}/:businessId`} element={<Business />} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default Router;
