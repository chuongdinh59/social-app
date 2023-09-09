import { createContext, useState } from 'react';
import postService from '../apis/postService';
import { toast } from 'react-toastify';

export const PostContext = createContext();
export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const handleDeletePost = (id) => {
    console.log(id);
    // update ui
    const newPost = posts.filter((post) => post.id !== id);
    setPosts(newPost);
    // fetch
    postService.deletePost(id).then((res) => {
      if (res.status === 204) {
        toast.success('Xoá bài post thành công');
      }
    });
  };
  const updatePosts = (newPosts, isAdd = false) => {
    if (isAdd) setPosts((prevPosts) => [...newPosts, ...prevPosts]);
    else setPosts((prevPosts) => [...prevPosts, ...newPosts]);
  };
  console.log(posts);
  const value = {
    posts,
    updatePosts,
    setPosts,
    handleDeletePost
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}
