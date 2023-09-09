import { AuthRoute } from '../components/AuthRoute';
import PageNotFound from '../pages/404';
import ChangePassword from '../pages/auth/ChangePassword';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Chat from '../pages/chat';
import Home from '../pages/home';
import PostDetail from '../pages/home/PostDetails';
import Profile from '../pages/profile';
import FriendProfile from '../pages/profile/FriendProfile';

export const routers = [
  { path: '/', element: <Home /> },
  { path: 'user/:slug', element: <FriendProfile /> },
  { path: 'login', element: <Login /> },
  {
    path: 'change-password',
    element: <ChangePassword />
  },
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
  {
    path: 'post/:id', // Add the new route for PostDetail with a variable :id
    element: <PostDetail />
  },
  { path: 'register', element: <Register /> },
  { path: '*', element: <PageNotFound /> }
];
