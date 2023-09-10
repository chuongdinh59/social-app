import { ChatProvider } from './ChatContext';
import { PostProvider } from './PostContext';
import { UserProvider } from './UserContext';

export function AppProvider({ children }) {
  return (
    <UserProvider>
      <ChatProvider>
        <PostProvider>{children}</PostProvider>
      </ChatProvider>
    </UserProvider>
  );
}

export default AppProvider;
