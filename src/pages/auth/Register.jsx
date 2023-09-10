import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import * as React from 'react';
import { useState } from 'react';
import userService from '../../apis/userService';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPass: '',
    email: ''
  });
  // Mutations
  const mutation = useMutation((formData) => userService.registerAccount(formData), {
    onSuccess: (res) => {
      console.log(res);
      navigate('/login');
    },
    onError: (error) => {
      console.error('Error:', error.message);
    }
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const validateForm = (form) => {
    for (const pair of form) {
      const fieldName = pair[0];
      const fieldValue = pair[1];
      if (fieldName != 'avatarFile' && !fieldValue.trim()) {
        return false;
      }
    }
    if (form.get('password') != form.get('confirmPassword')) return false;
    return true;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    selectedFile && form.append('avatarFile', selectedFile);
    if (validateForm(form)) {
      mutation.mutate(form);
    } else {
      toast.error('Chưa đủ thông tin hoặc mật khẩu không khớp xác nhận');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: 'secondary.main', width: 100, height: 100 }}
            src={selectedFile && URL.createObjectURL(selectedFile)}
            alt='Avatar'
          />
          <Grid item xs={12}>
            <label htmlFor='avatar'>
              <input
                style={{ display: 'none' }}
                onChange={handleFileChange}
                id='avatar'
                name='avatar'
                type='file'
                accept='image/*'
              />
              <Button size='small' color='primary' variant='contained' component='span' startIcon={<CloudUploadIcon />}>
                Upload
              </Button>
            </label>
          </Grid>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>

          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} encType='multipart/form-data'>
            <TextField id='role' name='role' value={2} style={{ display: 'none' }} />
            <TextField id='status' name='status' value={'DEACTIVE'} style={{ display: 'none' }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <TextField required fullWidth id='alumniId' label='Your ID' name='alumniId' />
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  required
                  fullWidth
                  id='displayName'
                  label='Display name'
                  name='displayName'
                  autoComplete='family-name'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  label='Password'
                  name='password'
                  variant='outlined'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={handleTogglePassword} edge='end'>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  label='Confirm Password'
                  name='confirmPassword'
                  variant='outlined'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={handleTogglePassword} edge='end'>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id='email' label='Email Address' name='email' autoComplete='email' />
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='#' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
