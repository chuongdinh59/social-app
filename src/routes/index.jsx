import PageNotFound from '../pages/404';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Home from '../pages/home';
import Profile from '../pages/profile';

export const routers = [
  { path: '/', element: <Home /> },
  { path: 'login', element: <Login /> },
  { path: 'profile', element: <Profile /> },
  { path: 'register', element: <Register /> },
  { path: '*', element: <PageNotFound /> }
];