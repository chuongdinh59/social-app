import { AuthRoute } from '../components/AuthRoute';
import PageNotFound from '../pages/404';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Chat from '../pages/chat';
import Home from '../pages/home';
import Profile from '../pages/profile';
import FriendProfile from '../pages/profile/FriendProfile';

export const routers = [
  { path: '/', element: <Home /> },
  { path: 'pr', element: <FriendProfile /> },
  { path: 'login', element: <Login /> },
  {
    path: 'profile',
    element: <AuthRoute redirect='/login' />,
    children: [
      { index: true, element: <Profile /> } // Use "index: true" for the default nested route
      // Add other nested routes for the profile page if needed
    ]
  },
  {
    path: 'chat',
    element: <AuthRoute redirect='/login' />,
    children: [
      { index: true, element: <Chat /> } // Use "index: true" for the default nested route
      // Add other nested routes for the chat page if needed
    ]
  },
  { path: 'user/' },
  { path: 'register', element: <Register /> },
  { path: '*', element: <PageNotFound /> }
];
