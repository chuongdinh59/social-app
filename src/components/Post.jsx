import { Favorite, FavoriteBorder, MoreVert, Share } from '@mui/icons-material';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  ClickAwayListener,
  Divider,
  Grow,
  IconButton,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { PostType, Status, imagePost, myComments, survey } from '../mock/post';
import Comment from './Comment';
import ImageGrid from './ImageGrid';
import ImageModal from './ImageModal';
import Survey from './Survey';
const Post = ({ post }) => {
  // #region Section for handling Card Headers
  const {
    id,
    content,
    count_action,
    createdDate,
    imagePostSet: images,
    lockComment,
    modifiedDate,
    type,
    user,
    questions
  } = post;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [showModal, setShowModal] = useState(false);
  const handleToggleModal = () => setShowModal(!showModal);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleDeletePost = () => {};
  //#endregion

  // #region Section for handling actions on the post
  const [actionOnPost, setActionOnPost] = useState('');
  const isHavingAction = Boolean(actionOnPost);

  const handleClickOnAction = (type) => {
    setActionOnPost(type);
  };
  // #endregion

  // #region Section for handling comments
  const [comments, setComments] = useState([]);
  const handleClickOnComment = () => {
    setIsCommentSectionShow((current) => !current);
  };

  const [comment, setComment] = useState([]);
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  // Test user
  const handleAddComment = () => {
    if (comment.trim() !== '') {
      const newComment = {
        user: {
          alumni_id: 'chudev',
          displayName: 'Bob Bob',
          email: 'bobwilliams@example.com',
          status: Status.ACTIVE,
          created_date: '20-11-2023',
          modified_date: '20-11-2023',
          avatar: 'https://source.unsplash.com/random?wallpapers'
        },
        content: comment
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  const [isCommentSectionShow, setIsCommentSectionShow] = useState(false);
  // #endregion
  return (
    <Card sx={{ margin: 5 }}>
      <Box>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: 'red' }} aria-label='recipe' src={user.avatar} />}
          action={
            <IconButton aria-label='settings' onClick={handleMenuClick}>
              <MoreVert />
            </IconButton>
          }
          title={user.displayName}
          subheader={createdDate}
        />
        <div>
          <Popper open={open} anchorEl={anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleMenuClose}>
                    <MenuList autoFocusItem={open} id='menu-list-grow'>
                      <MenuItem onClick={handleDeletePost}>
                        <ListItemIcon>
                          <DeleteIcon fontSize='small' />
                        </ListItemIcon>
                        <ListItemText primary='Delete' />
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Box>
      {type === PostType.SURVEY && <Survey survey={questions} />}
      <ImageGrid images={images} handleToggleModal={handleToggleModal} />
      <ImageModal show={showModal} images={images} onClose={handleToggleModal} />
      {/* Card Content */}
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label='add to favorites'
          sx={{ border: '1px' }}
          onClick={() => handleClickOnAction('FAVORITE')}
        >
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: 'red' }} />}
            checked={isHavingAction}
          />
          <Typography>{count_action}</Typography>
        </IconButton>
        <IconButton aria-label='comments' onClick={handleClickOnComment}>
          <CommentOutlinedIcon />
          {/* <Typography>{com.length}</Typography> */}
        </IconButton>
        <IconButton aria-label='share'>
          <Share />
        </IconButton>
      </CardActions>
      <Divider />
      {/* Comment section */}
      <Box display={isCommentSectionShow ? 'block' : 'none'}>
        <CardContent>
          {comments.map((comment, index) => (
            <Comment comment={comment} key={index} />
          ))}
        </CardContent>
        <CardContent>
          <TextField
            fullWidth
            label='Leave a comment'
            value={comment}
            onChange={handleCommentChange}
            variant='outlined'
            margin='dense'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={handleAddComment}>
                    <SendOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </CardContent>
      </Box>
    </Card>
  );
};

export default Post;
