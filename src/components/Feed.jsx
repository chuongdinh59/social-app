import { Box, Skeleton, Stack } from '@mui/material';
import { useState } from 'react';
import { posts } from '../mock/post';
import Post from './Post';

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const ps = posts;
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
          {ps.map((post) => {
            return <Post key={post.id} post={post} />;
          })}
        </>
      )}
    </Box>
  );
};

export default Feed;
