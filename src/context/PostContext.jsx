import { createContext, useState } from 'react';

export const PostContext = createContext();
export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);

  const updatePosts = (newPosts, isAdd = false) => {
    if (isAdd) setPosts((prevPosts) => [...newPosts, ...prevPosts]);
    else setPosts((prevPosts) => [...prevPosts, ...newPosts]);
  };
  const value = {
    posts,
    updatePosts
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}
