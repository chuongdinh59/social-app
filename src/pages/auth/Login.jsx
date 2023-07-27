import { Facebook, Google } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../../apis/authService';
import userService from '../../apis/userService';
import UserContext from '../../context/UserContext';
import { setAccessTokenToLS, setProfileToLS, setRefreshTokenToLS } from '../../utils/auth';
import { Skeleton } from '@mui/material';
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
  const loginMutate = useMutation({
    mutationFn: (body) => {
      return authService.login(body);
    }
  });
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    isLoading: isUserLoading,
    error: userError,
    refetch: refetchUserData
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => userService.getCurrentUser(),
    enabled: false,
    onSuccess: (res) => {
      const { data } = res?.data;
      setProfileToLS(data);
      setUser(data);
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let username = data.get('username');
    let password = data.get('password');
    if (username === '' || password === '') {
      toast.error('Không thể để trống username hay password');
      return;
    }
    loginMutate.mutate(data, {
      onSuccess: (res) => {
        const {
          data: { token, refreshToken }
        } = res?.data;
        // save token in local storage
        setAccessTokenToLS(token);
        setRefreshTokenToLS(refreshToken);
        if (token) {
          refetchUserData();
        }
        navigate('/');
      }
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin='normal'
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
              <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />

              <Button
                type='submit'
                size='large'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 1 }}
                style={{ borderRadius: '10px' }}
              >
                Sign In
              </Button>
              <Button
                sx={{ mt: 1 }}
                variant='contained'
                style={{ backgroundColor: '#FF0000', color: '#FFFFFF', borderRadius: '10px' }}
                startIcon={<Google />}
                fullWidth
                size='large'
              >
                Continue with Google
              </Button>

              <Button
                sx={{ mt: 1, mb: 3 }}
                variant='contained'
                style={{ backgroundColor: '#4267B2', color: '#FFFFFF', borderRadius: '10px' }}
                startIcon={<Facebook />}
                fullWidth
                size='large'
              >
                Continue with Facebook
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='#' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}