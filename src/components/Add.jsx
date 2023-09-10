import { Add as AddIcon, EmojiEmotions, Image, PersonAdd, VideoCameraBack } from '@mui/icons-material';
import {
  Avatar,
  Button,
  ButtonGroup,
  Fab,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
  Tooltip,
  Typography,
  styled
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react';
import postService from '../apis/postService';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { PostContext } from '../context/PostContext';
import UserContext from '../context/UserContext';

const SytledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const UserBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '20px'
});

const Add = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [fileData, setFileData] = useState([]);
  const { updatePosts } = useContext(PostContext);
  const { profile } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const openExplorer = () => {
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
      fileInput.click();
    }
  };
  const postMutate = useMutation({
    mutationFn: (body) => {
      return postService.createPost(body);
    }
  });
  const sendPost = async () => {
    if (!text?.trim() && fileData.length === 0) {
      toast.warning('Bài post chưa có nội dung');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('content', text);
      for (let i = 0; i < fileData.length; i++) {
        formData.append('images', fileData[i].file);
      }
      console.log(formData);
      const { data } = await postMutate.mutateAsync(formData);
      console.log(data);
      updatePosts([data], true);
      toast.success('Đằng bài thành công');
      setOpen(false);
      setText('');
    } catch {
      toast.error('Đăng bài không thành công');
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const updatedFileData = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        updatedFileData.push({ file, preview: e.target.result });

        if (updatedFileData.length === files.length) {
          setFileData(updatedFileData);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title='Add a Post'
        sx={{
          position: 'fixed',
          bottom: 20,
          left: { xs: 'calc(50% - 25px)', md: 30 }
        }}
      >
        <Fab color='primary' aria-label='add'>
          <AddIcon />
        </Fab>
      </Tooltip>
      <SytledModal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          width={550}
          bgcolor={'background.default'}
          color={'text.primary'}
          p={3}
          component='form'
          encType='multipart/form-data'
          borderRadius={5}
          style={{
            overflow: 'auto',
            maxHeight: '600px'
          }}
        >
          <Typography variant='h6' color='gray' textAlign='center'>
            Create post
          </Typography>
          <UserBox>
            <Avatar src={profile.avatar} sx={{ width: 30, height: 30 }} />
            <Typography fontWeight={500} variant='span'>
              {profile.displayName}
            </Typography>
          </UserBox>
          <TextField
            sx={{ width: '100%' }}
            id='standard-multiline-static'
            multiline
            rows={3}
            placeholder="What's on your mind?"
            variant='standard'
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          />
          <Stack direction='row' gap={1} mt={2} mb={3}>
            <IconButton color='primary'>
              <EmojiEmotions />
            </IconButton>
            <input
              accept='image/*'
              id='file-input'
              type='file'
              multiple
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <IconButton color='secondary' onClick={openExplorer}>
              <Image />
            </IconButton>
            <IconButton color='success'>
              <VideoCameraBack />
            </IconButton>
            <IconButton color='error'>
              <PersonAdd />
            </IconButton>
          </Stack>
          <Grid container spacing={1} paddingBottom={'10px'} paddingTop={'10px'}>
            {fileData.map((data, index) => {
              // console.log(index, data);
              // let size = index === 0 ? 12 : 3;
              let numberOfItem = fileData.length;
              let size = 12 / (numberOfItem - 1 === 0 ? 1 : numberOfItem - 1);
              size = numberOfItem > 4 ? 3 : size;
              // 2 item -> size = 12
              // 3 item -> size =6
              // 4 item -> size = 3
              let itemStyle = {
                position: 'relative',
                ...(size === 3 && {
                  height: '75px'
                })
              };
              if (index > 4) {
                return null; // Exit the loop after rendering the 4th item
              }
              if (index === 4) {
                return (
                  <Grid item xs={size} key={index}>
                    <Box
                      style={{
                        position: 'relative',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)' // Darker background color
                      }}
                    >
                      <img src={data.preview} alt={`Preview ${index}`} style={{ maxWidth: '100%', height: '75px' }} />
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          color: 'white',
                          fontSize: '24px',
                          fontWeight: 'bold',
                          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
                        }}
                      >
                        +{numberOfItem - 5}
                      </div>
                    </Box>
                  </Grid>
                );
              }
              return (
                <Grid item xs={index === 0 ? 12 : size} key={index}>
                  <img
                    src={data.preview}
                    alt={`Preview ${index}`}
                    style={{ ...(index === 0 ? {} : itemStyle), objectFit: 'fill' }}
                  />
                </Grid>
              );
            })}
          </Grid>

          <ButtonGroup fullWidth variant='contained' aria-label='outlined primary button group'>
            <Button onClick={sendPost}>Post</Button>
          </ButtonGroup>
        </Box>
      </SytledModal>
    </>
  );
};

export default Add;
