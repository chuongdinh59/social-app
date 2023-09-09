import { ThemeProvider } from '@emotion/react';
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
  createTheme
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import postService from '../../apis/postService';
import userService from '../../apis/userService';
import Navbar from '../../components/Navbar';
import Post from '../../components/Post';
import useQueryParams from '../../hooks/useSearchParams';
const friends = [
  {
    img: 'img1.jpg',
    name: 'John Doe'
  },
  {
    img: 'img2.jpg',
    name: 'Jane Smith'
  },
  {
    img: 'img3.jpg',
    name: 'Michael Johnson'
  },
  {
    img: 'img4.jpg',
    name: 'Emily Davis'
  },
  {
    img: 'img5.jpg',
    name: 'David Wilson'
  },
  {
    img: 'img6.jpg',
    name: 'Sarah Brown'
  },
  {
    img: 'img7.jpg',
    name: 'Chris Lee'
  },
  {
    img: 'img8.jpg',
    name: 'Olivia Taylor'
  },
  {
    img: 'img9.jpg',
    name: 'Daniel Martinez'
  }
];
const FriendProfile = () => {
  /**
   * params {userId}
   */
  const params = useQueryParams();
  const { slug } = useParams();
  // User của trang profile
  const [user, setUser] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await postService.getPosts(page, { userId: user.id, slug });
      response?.data.posts && setIsEnd(true);
      setPosts((prevPosts) => [...prevPosts, ...(response?.data?.posts || [])]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      toast.error('error: ', error);
    } finally {
      setLoading(false);
    }
  };
  /**
   * lấy user Profile
   */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userService.getUserBySlugOrId({
          slug,
          id: params.id || null
        });
        setUser(res.data);
      } catch (error) {}
    };
    fetchUser();
  }, [params?.userId, slug]);
  /**
   * Get posts
   */
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ThemeProvider
      theme={createTheme({
        palette: { mode: 'light' }
      })}
    >
      <Navbar />
      <Container>
        <Paper sx={{ padding: 1 }}>
          {/* Cover Photo */}
          <Container style={{ position: 'relative', height: '400px' }}>
            {/* Profile Picture and User Info */}
            <Container style={{ position: 'relative', height: '400px' }}>
              <img
                src={user.coverBg}
                alt='Cover'
                style={{
                  width: '100%',
                  height: '90%',
                  marginBottom: 16,
                  position: 'absolute',
                  objectFit: 'cover',
                  left: 0,
                  cursor: 'pointer'
                }}
              />
              {/* Profile Picture and User Info */}
              <Avatar
                alt={user.name}
                src={user.avatar}
                sx={{
                  width: 150,
                  height: 150,
                  position: 'absolute',
                  bottom: '0',
                  left: '50%',
                  transform: 'translate(-50%)',
                  cursor: 'pointer'
                }}
              />
            </Container>
          </Container>
          <Typography variant='h5' align='center' gutterBottom>
            {user.name}
          </Typography>

          <Grid container alignItems='center' justifyContent='center' gap={5} marginY={3}>
            <Grid item>
              <Typography variant='body2' align='center' gutterBottom>
                2 post
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body2' align='center' gutterBottom>
                2 followers
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body2' align='center' gutterBottom>
                0 following
              </Typography>
            </Grid>
          </Grid>
          <Typography variant='body1' color='text.secondary' align='center' gutterBottom>
            @{user.displayName}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              {/* <Typography variant='h5' sx={{ marginTop: 3 }}>
              Introduce
            </Typography> */}
              <Typography variant='h5' sx={{ marginTop: 3 }}>
                Friends
              </Typography>

              <Grid
                container
                spacing={1}
                mt={5}
                padding={2}
                style={{
                  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
                }}
              >
                {friends.map((item, index) => {
                  return (
                    <Grid item xs={4} key={index}>
                      <Box
                        component='img'
                        alt='The house from the offer.'
                        src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=1'
                        style={{
                          borderRadius: '5px',
                          boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
                        }}
                      />
                      <Typography sx={{ marginTop: 3, textAlign: 'center' }}>{item.name}</Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Paper sx={{ padding: 1 }}>
                <Typography variant='h5' sx={{ marginTop: 3 }}>
                  Posts
                </Typography>
                {/* get some post use post components */}
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
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default FriendProfile;
