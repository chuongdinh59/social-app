import { PostProvider } from './PostContext';
import { UserProvider } from './UserContext';

export function AppProvider({ children }) {
  return (
    <UserProvider>
      <PostProvider>{children}</PostProvider>
    </UserProvider>
  );
}

export default AppProvider;
