import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getProfileFromLS } from '../utils/auth';

export const AuthRoute = ({ redirect = '/' }) => {
  const user = getProfileFromLS();
  const { state } = useLocation();
  if (!user) return <Navigate to={state?.redirect || redirect} />;

  return <Outlet />;
};
