import { AccountCircle, Settings } from '@mui/icons-material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SendIcon from '@mui/icons-material/Send';
import {
  Avatar,
  Button,
  Container,
  FormControl,
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
import { getProfileFromLS, setProfileToLS } from '../../utils/auth';
import { useMutation } from '@tanstack/react-query';
import userService from '../../apis/userService';
import Add from '../../components/Add';
const Profile = () => {
  let user = getProfileFromLS();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isShowSetting, setIsShowButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(user.avatar); // Default image URL
  const [displayName, setDisplayName] = useState(user.displayName || ''); // Default display name
  const [avatarFile, setAvatarFile] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(user.coverBg);
  const [backgroundImageFile, setBackgroundImageFile] = useState(null);
  const handleClose = () => setIsShowButton(false);
  const mutation = useMutation((updatedUser) => userService.updateAccount(updatedUser), {
    onSuccess: (res) => {
      console.log(res);
      toast.success('Cập nhật thông tin thành công');
      setIsShowButton(false);
    },
    onError: (error) => {
      toast.error('Cập nhật thông tin thất bại');
    }
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await postService.getPosts(page, user.id);
      setPosts((prevPosts) => [...prevPosts, ...(response?.data || [])]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      toast.error('error: ', error);
    } finally {
      setLoading(false);
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(event.target.id);
        if (event.target.id === 'image-input-bg') {
          setBackgroundImage(e.target.result); // Update background image
          setBackgroundImageFile(file);
        } else {
          setImageSrc(e.target.result); // Update avatar image
          setAvatarFile(file);
        }
        setProfileToLS({
          ...user,
          avatar: e.target.result
        });
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };
  const handleUpdateProfile = () => {
    if (imageSrc !== null && imageSrc !== user.avatar) {
      user = { ...user, avatarFile: avatarFile };
      console.log(imageSrc);
      setProfileToLS({
        ...user,
        avatar: imageSrc
      });
    }
    if (displayName !== null && displayName !== user.displayName) {
      user = { ...user, displayName: displayName };
      setProfileToLS({
        ...user,
        displayName
      });
    }
    if (backgroundImage !== null && backgroundImage !== user.coverBg) {
      user = { ...user, coverBg: backgroundImageFile };
      setProfileToLS({
        ...user,
        coverBg: backgroundImage
      });
    }
    user = {
      ...user,
      role: user.role.id
    };
    mutation.mutate(user);
  };
  useEffect(() => {
    userService.getCurrentUser().then((res) => {
      setProfileToLS(res.data);
      setImageSrc(res.data.avatar);
      setBackgroundImage(res.data.coverBg);
    });
    fetchData();
  }, []);
  return (
    <>
      <Add />
      <CustomModal open={isShowSetting} handleClose={handleClose}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '300px',
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          >
            <label
              htmlFor='image-input-bg'
              style={{
                position: 'absolute',
                bottom: '-5%',
                right: '0%'
              }}
            >
              <input
                type='file'
                accept='image/*'
                id='image-input-bg'
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <CameraAltIcon sx={{ height: '30px', width: '30px' }} />
            </label>
            <div
              style={{
                position: 'absolute',
                left: '50%',
                bottom: '-20%',
                transform: 'translateX(-50%)'
              }}
            >
              <Avatar sx={{ width: 100, height: 100, marginTop: '30px' }} alt='Remy Sharp' src={imageSrc} />
              <input
                type='file'
                accept='image/*'
                id='image-input'
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <label
                htmlFor='image-input'
                style={{
                  position: 'absolute',
                  bottom: '-5%',
                  right: '-5%'
                }}
              >
                <CameraAltIcon sx={{ height: '30px', width: '30px' }} />
              </label>
            </div>
          </div>
          <FormControl variant='standard' sx={{ marginTop: '50px' }} fullWidth>
            <InputLabel htmlFor='input-with-icon-adornment'>Display name</InputLabel>
            <Input
              id='input-with-icon-adornment'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              startAdornment={
                <InputAdornment position='start'>
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>

          <Button fullWidth sx={{ marginTop: '30px' }} onClick={handleUpdateProfile}>
            Cập nhật thông tin
          </Button>
        </div>
      </CustomModal>
      <Container>
        <Paper sx={{ padding: 1 }}>
          {/* Cover Photo */}
          <Container style={{ position: 'relative', height: '400px' }}>
            <img
              src={backgroundImage}
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
              src={imageSrc}
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
