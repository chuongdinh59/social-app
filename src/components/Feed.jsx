import { Alert, AlertTitle, Box, Skeleton, Stack } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';
import postService from '../apis/postService';
import { PostContext } from '../context/PostContext';
import Post from './Post';

const Feed = () => {
  const { posts, updatePosts } = useContext(PostContext);
  const [loading, setLoading] = useState();
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await postService.getPosts(page);
      if (response?.data?.posts?.length === 0) {
        setIsEnd(true);
      }
      updatePosts(response?.data?.posts || []);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      toast.error('error: ', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchData}
        hasMore={true} // Replace with a condition based on your data source
        loader={
          isEnd ? (
            <Alert severity='info'>
              <AlertTitle>Thông báo</AlertTitle>
              Hết bài — <strong>check it out!</strong>
            </Alert>
          ) : (
            <Stack spacing={1}>
              <Skeleton variant='text' height={100} />
              <Skeleton variant='text' height={20} />
              <Skeleton variant='text' height={20} />
              <Skeleton variant='rectangular' height={300} />
            </Stack>
          )
        }
        endMessage={<p>No more data to load.</p>}
      >
        <ul>
          {posts?.map((post, index) => {
            return <Post key={index} post={post} />;
          })}
        </ul>
      </InfiniteScroll>
    </Box>
  );
};

export default Feed;
