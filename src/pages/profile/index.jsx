import { ThemeProvider } from '@emotion/react';
import { AccountCircle, Settings } from '@mui/icons-material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Skeleton,
  Stack,
  Typography,
  createTheme
} from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';
import postService from '../../apis/postService';
import userService from '../../apis/userService';
import Add from '../../components/Add';
import CustomLoading from '../../components/CustomLoading';
import CustomModal from '../../components/CustomModal';
import Navbar from '../../components/Navbar';
import Post from '../../components/Post';
import UserContext from '../../context/UserContext';
import { setProfileToLS } from '../../utils/auth';
import { PostContext } from '../../context/PostContext';
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
const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page when the component mounts or updates
  }, []);
  // let user = getProfileFromLS();
  const { profile: user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(user.avatar); // Default image URL
  const [imageSrcModal, setImageSrcModal] = useState('');
  const [isShowImage, setIsShowImage] = useState(false);
  const [displayName, setDisplayName] = useState(user.displayName || ''); // Default display name
  const [slug, setSlug] = useState(user.slug || '');
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [isEndPost, setIsEndPost] = useState(false);
  // #region Avatar
  const [isShowAvatarModal, setIsShowAvatarModal] = useState(false);
  const avatarFile = useRef();
  const handleAvatarSelectClick = () => {
    // Trigger the hidden input when the label is clicked
    avatarFile.current.click();
  };
  const handleAvatarFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setIsShowAvatarModal(false);
    setLoading(true);
    if (avatarFile?.current?.files) {
      console.log('Avatar File:');
      const data = await userService.updateAvatar({ files: avatarFile.current.files[0] });
      setImageSrc(data.data.avatar);
      setUser(data.data);
      setProfileToLS(data.data);
      console.log(data);
    }
    setLoading(false);
    console.log('Selected File:', selectedFile);
  };
  // #endregion
  // #region BG
  const [isShowBgModal, setIsShowBgModal] = useState(false);
  const bgFile = useRef();
  const handleBgSelectClick = () => {
    // Trigger the hidden input when the label is clicked
    bgFile.current.click();
  };
  const handleBgFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setIsShowAvatarModal(false);
    setLoading(true);
    if (bgFile?.current?.files) {
      console.log('Avatar File:');
      const data = await userService.updateBackground({ files: bgFile.current.files[0] });
      setBackgroundImage(data.data.coverBg); // V~
      setUser(data.data);
      setProfileToLS(data.data);
    }
    setLoading(false);

    console.log('Selected File:', selectedFile);
  };
  // #endregion
  const [backgroundImage, setBackgroundImage] = useState(user.coverBg);
  const [backgroundImageFile, setBackgroundImageFile] = useState(null);
  const handleClose = () => setIsShowAvatarModal(false);

  const handleUpdateProfile = async () => {
    console.log('SLUG', slug);
    console.log('DISPLAYNAME', displayName);
    const { displayName: myDisplayName, slug: mySlug } = user;
    let updateUser = {};
    let isChange = false;
    if (myDisplayName !== displayName) {
      updateUser = { ...updateUser, displayName };
      isChange = true;
    }
    if (slug !== '' && mySlug !== slug) {
      console.log('AAA');
      updateUser = { ...updateUser, slug };
      isChange = true;
    }
    if (isChange) {
      setLoading(true);
      const res = await userService.updateAccount(updateUser);
      const profile = res.data.data;
      setUser(profile);
      setProfileToLS(profile);
      setIsShowEdit(false);
      setLoading(false);
    }
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await postService.getPosts(page, { userId: user.id });
      response?.data.posts && setIsEndPost(true);
      setPosts((prevPosts) => [...prevPosts, ...(response?.data?.posts || [])]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      toast.error('error: ', error);
    } finally {
      setLoading(false);
    }
  };
  const deletePostProfile = (id) => {
    setPosts((pre) => pre.filter((post) => post.id !== id));
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
      {loading && <CustomLoading />}
      <ThemeProvider
        theme={createTheme({
          palette: { mode: 'light' }
        })}
      >
        <Navbar />
        <Add />
        {/* Avatar Modal */}
        <CustomModal open={isShowAvatarModal} handleClose={handleClose}>
          <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button sx={{ width: '100%' }} onClick={handleAvatarSelectClick}>
              Upload New Avatar
            </Button>
            <input type='file' ref={avatarFile} hidden onChange={handleAvatarFileChange} />
            <Button
              sx={{ width: '100%' }}
              onClick={() => {
                setIsShowImage(true);
                setImageSrcModal(imageSrc);
              }}
            >
              View Avatar
            </Button>
          </Box>
        </CustomModal>
        {/* Bg Modal */}
        <CustomModal open={isShowBgModal} handleClose={() => setIsShowBgModal(false)}>
          <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button sx={{ width: '100%' }} onClick={handleBgSelectClick}>
              Upload New Background
            </Button>
            <input type='file' ref={bgFile} hidden onChange={handleBgFileChange} />
            <Button
              sx={{ width: '100%' }}
              onClick={() => {
                setIsShowImage(true);
                setImageSrcModal(backgroundImage);
              }}
            >
              View BackGround
            </Button>
          </Box>
        </CustomModal>
        {/* Edit Modal */}
        <CustomModal open={isShowEdit} handleClose={() => setIsShowEdit(false)}>
          <FormControl variant='standard' sx={{ marginTop: '30px' }} fullWidth>
            <InputLabel htmlFor='input-with-icon-adornment'>Display name</InputLabel>
            <Input
              id='input-with-icon-adornment'
              onChange={(e) => setDisplayName(e.currentTarget.value)}
              value={displayName}
              startAdornment={
                <InputAdornment position='start'>
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant='standard' sx={{ marginTop: '30px' }} fullWidth>
            <InputLabel htmlFor='input-with-icon-adornment'>Slug</InputLabel>
            <Input
              id='input-with-icon-adornment'
              value={slug}
              onChange={(e) => setSlug(e.currentTarget.value)}
              startAdornment={
                <InputAdornment position='start'>
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
          <Button fullWidth style={{ padding: 5, marginTop: 10 }} variant='contained' onClick={handleUpdateProfile}>
            Cập nhật thông tin
          </Button>
        </CustomModal>
        {/* Main content */}
        <CustomModal open={isShowImage} handleClose={() => setIsShowImage(false)}>
          <Box
            component='img'
            sx={{
              width: '100%'
            }}
            alt='The house from the offer.'
            src={imageSrcModal}
          />
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
                  left: 0,
                  cursor: 'pointer'
                }}
                onClick={() => setIsShowBgModal(true)}
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
                  transform: 'translate(-50%)',
                  cursor: 'pointer'
                }}
                onClick={() => setIsShowAvatarModal(true)}
              />
              <label
                onClick={() => setIsShowAvatarModal(true)}
                style={{
                  position: 'absolute',
                  bottom: '0%',
                  right: '45%',
                  transform: 'translate(50%)'
                }}
              >
                <CameraAltIcon sx={{ height: '30px', width: '30px' }} />
              </label>
              <Button
                variant='contained'
                startIcon={<Settings fontSize='small' />}
                onClick={() => setIsShowEdit(true)}
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
                      isEndPost ? (
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
                        return <Post deletePostProfile={deletePostProfile} key={index} post={post} />;
                      })}
                    </ul>
                  </InfiniteScroll>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Profile;
