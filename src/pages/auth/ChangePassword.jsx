import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography
} from '@mui/material';
import React, { useContext, useState } from 'react';
import Navbar from '../../components/Navbar';
import userService from '../../apis/userService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserContext from '../../context/UserContext';
import { setProfileToLS } from '../../utils/auth';

function ChangePassword() {
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChangePassword = () => {
    if (password === '' || oldPassword === '') {
      toast.error('Phải điền đầy đủ password và oldPassword');
    } else {
      userService
        .activeLecture({
          oldPassword,
          password
        })
        .then((res) => {
          console.log(res);
          const user = res.data;
          if (user !== null && !!user) {
            setUser(user);
            setProfileToLS(user);
            if (user.role.name === 'ROLE_LECTURER' && user.status !== 'DEACTIVE') {
              navigate('/');
              toast.success('Thay đổi password thành công');
            } else {
              toast.error('Thay đổi password thất bại');
            }
          } else {
            toast.error('Mật khẩu cũ sai ');
          }
        });
    }
  };
  return (
    <Box
      sx={{
        position: 'relative'
      }}
    >
      <Navbar />
      {/* Title */}
      <Typography
        sx={{
          position: 'absolute',
          top: '100px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
        variant='h4'
      >
        Change Password
      </Typography>{' '}
      {/* Title */}
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        height='calc(100vh - 64px)'
      >
        <FormControl variant='outlined' sx={{ width: '80%', marginBottom: 5 }}>
          <InputLabel>Mật khẩu cũ</InputLabel>
          <OutlinedInput
            type={showOldPassword ? 'text' : 'password'}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  edge='end'
                >
                  {showOldPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label='Password'
          />
        </FormControl>
        <FormControl variant='outlined' sx={{ width: '80%' }}>
          <InputLabel>Đổi mật khẩu</InputLabel>
          <OutlinedInput
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton aria-label='toggle password visibility' onClick={togglePasswordVisibility} edge='end'>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label='Password'
          />
        </FormControl>

        <Button onClick={handleChangePassword}>Đổi mật khẩu</Button>
      </Box>
    </Box>
  );
}

export default ChangePassword;
