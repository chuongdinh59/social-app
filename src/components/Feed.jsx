import { Box, Skeleton, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useRef, useState } from 'react';
import postService from '../apis/postService';
import { PostContext } from '../context/PostContext';
import Post from './Post';
const Feed = () => {
  const { posts, updatePosts } = useContext(PostContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const prevScrollY = useRef(0); // Use a ref to store previous scroll position

  const loadNextPage = async (pageNumber) => {
    try {
      const { data } = await postService.getPosts(pageNumber);
      if (data && data.length !== 0) {
        updatePosts(data);
        setPage(pageNumber);
      }
    } catch (error) {
      // Handle error
    }
  };

  const handleScroll = () => {
    const scrollThreshold = window.innerHeight;
    if (window.scrollY + scrollThreshold + 100 >= document.body.scrollHeight) {
      if (!loading) {
        setLoading(true);
        prevScrollY.current = window.scrollY; // Store current scroll position
        loadNextPage(page + 1);
      }
    }
  };

  useEffect(() => {
    // Load initial page when the component mounts
    loadNextPage(1);
  }, []);

  useEffect(() => {
    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page, loading]);

  // After new content is loaded and component re-renders, adjust scroll position
  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, prevScrollY.current); // Restore previous scroll position
    }
  }, [loading]);

  console.log(posts);

  setTimeout(() => {
    setLoading(false);
  }, [1000]);

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant='text' height={100} />
          <Skeleton variant='text' height={20} />
          <Skeleton variant='text' height={20} />
          <Skeleton variant='rectangular' height={300} />
        </Stack>
      ) : (
        <>
          {/* {posts.map((post, index) => {
            return (
              <div key={index}>
                <Post />
              </div>
            );
          })} */}
          {posts?.map((post) => {
            return <Post key={post.id} post={post} />;
          })}
        </>
      )}
    </Box>
  );
};

export default Feed;
