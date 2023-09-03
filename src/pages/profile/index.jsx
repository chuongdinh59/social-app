import { AccountCircle, Settings } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email'; // Assuming you are using MUI icons
import LockIcon from '@mui/icons-material/Lock'; // Assuming you are using MUI icons
import SendIcon from '@mui/icons-material/Send';
import {
  Avatar,
  Button,
  Container,
  FormControl,
  FormGroup,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';
import postService from '../../apis/postService';
import CustomModal from '../../components/CustomModal';
import Post from '../../components/Post';
import { getProfileFromLS } from '../../utils/auth';
const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isShowSetting, setIsShowButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setIsShowButton(false);
  let user = getProfileFromLS();
  const fetchData = async () => {
    console.log('CALL API', page);
    setLoading(true);
    try {
      const response = await postService.getPosts(page, user.id);
      setPosts((prevPosts) => [...prevPosts, ...(response?.data || [])]);
      console.log(page);
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
    <>
      <CustomModal open={isShowSetting} handleClose={handleClose}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            sx={{ width: 100, height: 100, marginTop: '30px' }}
            alt='Remy Sharp'
            src='https://picsum.photos/200/300'
          />

          <FormControl variant='standard' sx={{ marginTop: '30px' }} fullWidth>
            <InputLabel htmlFor='input-with-icon-adornment'>Display name</InputLabel>
            <Input
              id='input-with-icon-adornment'
              startAdornment={
                <InputAdornment position='start'>
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl variant='standard' sx={{ marginTop: '30px' }} fullWidth>
            <InputLabel htmlFor='input-with-icon-adornment'>Display name</InputLabel>
            <Input
              id='input-with-icon-adornment'
              startAdornment={
                <InputAdornment position='start'>
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl variant='standard' sx={{ marginTop: '30px' }} fullWidth>
            <InputLabel htmlFor='input-with-icon-adornment'>Display name</InputLabel>
            <Input
              id='input-with-icon-adornment'
              startAdornment={
                <InputAdornment position='start'>
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl variant='standard' sx={{ marginTop: '30px' }} fullWidth>
            <InputLabel htmlFor='input-with-icon-adornment'>Display name</InputLabel>
            <Input
              id='input-with-icon-adornment'
              startAdornment={
                <InputAdornment position='start'>
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>

          <Button fullWidth sx={{ marginTop: '30px' }}>
            Cập nhật thông tin
          </Button>
        </div>
      </CustomModal>
      <Container>
        <Paper sx={{ padding: 1 }}>
          {/* Cover Photo */}
          <Container style={{ position: 'relative', height: '400px' }}>
            <img
              src={user.coverPhoto}
              alt='Cover'
              style={{
                width: '100%',
                height: '90%',
                marginBottom: 16,
                position: 'absolute',
                objectFit: 'cover',
                left: 0
              }}
            />
            {/* Profile Picture and User Info */}
            <Avatar
              alt={user.name}
              src={user.profilePicture}
              sx={{
                width: 150,
                height: 150,
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translate(-50%)'
              }}
            />

            <Button
              variant='contained'
              onClick={() => setIsShowButton(true)}
              startIcon={<Settings fontSize='small' />}
              style={{
                backdropFilter: 'blur(5px)', // Add a blur effect to the background
                backgroundColor: 'rgba(0, 0, 0, 0.3)', // Gray blur background
                borderRadius: '20px', // Rounded corners
                padding: '5px', // Adjust padding to make it smaller
                minWidth: '80px', // Set a minimum width to control the size
                fontSize: '12px', // Make the font size smaller
                position: 'absolute',
                bottom: 0,
                right: 0
              }}
            >
              Edit Profile
            </Button>
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
            @{user.alumniId}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              {/* <Typography variant='h5' sx={{ marginTop: 3 }}>
              Introduce
            </Typography> */}
              <Typography variant='h5' sx={{ marginTop: 3 }}>
                Friends
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Paper sx={{ padding: 1, marginBottom: 2 }}>
                <TextField
                  placeholder='What do you think, broh :v'
                  style={{ width: '100%' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton>
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Paper>
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
                    <Stack spacing={1}>
                      <Skeleton variant='text' height={100} />
                      <Skeleton variant='text' height={20} />
                      <Skeleton variant='text' height={20} />
                      <Skeleton variant='rectangular' height={300} />
                    </Stack>
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
    </>
  );
};

export default Profile;
