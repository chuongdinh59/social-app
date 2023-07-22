import Login from '../pages/auth/Login';
import Home from '../pages/home';

export const routers = [
  { path: '/', element: <Home /> },
  { path: 'login', element: <Login /> }
];
