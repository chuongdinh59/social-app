import {
  Avatar,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Backdrop
} from '@mui/material';
import Comment from '../../components/Comment';
import SendIcon from '@mui/icons-material/Send';
import { Settings } from '@mui/icons-material';

const Profile = () => {
  // const useStyles = makeStyles((theme) => ({
  //   containerAvatar: {
  //     position: 'relative',
  //     height: '300px'
  //   }
  // }));
  // Sample data for the user's profile
  const user = {
    name: 'John Doe',
    username: 'johndoe',
    bio: 'Web developer | Coffee lover | Travel enthusiast',
    location: 'New York, USA',
    profilePicture: 'https://source.unsplash.com/random?wallpapers',
    coverPhoto: 'https://source.unsplash.com/random?wallpapers'
  };

  // Sample data for user posts
  const posts = [
    {
      id: 1,
      imageUrl: 'https://source.unsplash.com/random?wallpapers',
      caption: 'Amazing sunset view!'
    },
    {
      id: 2,
      imageUrl: 'https://source.unsplash.com/random?wallpapers',
      caption: 'Exploring new places...'
    }
    // Add more posts as needed
  ];

  return (
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

        <Grid xs={12} container alignItems='center' justifyContent='center' gap={5} marginY={3}>
          <Typography variant='body2' align='center' gutterBottom>
            2 post
          </Typography>
          <Typography variant='body2' align='center' gutterBottom>
            2 followers
          </Typography>
          <Typography variant='body2' align='center' gutterBottom>
            0 following
          </Typography>
        </Grid>
        <Typography variant='body1' color='text.secondary' align='center' gutterBottom>
          @{user.username}
        </Typography>

        <Typography variant='body2' align='center' gutterBottom>
          {user.bio}
        </Typography>
        <Typography variant='body2' color='text.secondary' align='center' gutterBottom>
          {user.location}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant='h5' sx={{ marginTop: 3 }}>
              Introduce
            </Typography>
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
              {posts.map((post) => (
                <Grid item xs={12} key={post.id}>
                  <Paper sx={{ padding: 2, borderRadius: 2, marginBottom: 4 }}>
                    <img
                      src={post.imageUrl}
                      alt='Post'
                      style={{ width: '100%', height: 400, marginBottom: 8, borderRadius: 20 }}
                    />
                    <Typography variant='body1'>{post.caption}</Typography>
                    {/* Comment component is here */}
                  </Paper>
                </Grid>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile;
