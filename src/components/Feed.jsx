import { Box, Stack, Skeleton } from '@mui/material';
import React, { useState } from 'react';
import Post from './Post';

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([{}, {}, {}]);
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
          {posts.map((post, index) => {
            return (
              <>
                <div key={index}>
                  <Post key={index} index={index} />
                </div>
              </>
            );
          })}
        </>
      )}
    </Box>
  );
};

export default Feed;
