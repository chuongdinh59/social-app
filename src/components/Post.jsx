import { FacebookCounter, FacebookSelector } from '@charkour/react-reactions';
import { MoreVert, Share } from '@mui/icons-material';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  ClickAwayListener,
  Divider,
  Grid,
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
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import commentService from '../apis/commentService';
import { PostType, Status } from '../mock/post';
import Comment from './Comment';
import ImageGrid from './ImageGrid';
import ImageModal from './ImageModal';
import Survey from './Survey';
import { getProfileFromLS } from '../utils/auth';
const useStyles = makeStyles((theme) => ({
  boxContainer: {
    position: 'relative',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-100%',
      left: 0,
      width: '220%',
      height: '100%',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      pointerEvents: 'none'
    }
  }
}));
const Post = ({ post }) => {
  // #region Section for handling Card Headers
  const classes = useStyles();
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
  const [showIcon, setShowIcon] = useState(false);
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState([]);
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
  const handleClickOnComment = async () => {
    let res = await commentService.getCommentByPostId(id);
    res?.data && setComments(res.data.data);
    setIsCommentSectionShow((current) => !current);
  };

  const [comment, setComment] = useState([]);
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleDeleteComent = (id) => {
    setComments((pre) => pre.filter((i) => i.id !== id));
  };
  // Test user
  const handleAddComment = async () => {
    if (comment.trim() !== '') {
      const newComment = {
        user: getProfileFromLS(),
        content: comment
      };
      setComments([...comments, newComment]);
      await commentService.addComment({
        content: comment,
        postId: id
      });
      setComment('');
    }
  };
  const [isCommentSectionShow, setIsCommentSectionShow] = useState(false);
  const handleGetMoreComments = async () => {
    let res = await commentService.getCommentByPostId(id, page + 1);
    res?.data && setComments((pre) => [...pre, ...res.data.data]);
  };
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
          <Popper
            sx={{
              zIndex: 10
            }}
            open={open}
            anchorEl={anchorEl}
            transition
            disablePortal
          >
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
      {type === PostType.SURVEY ? (
        <Survey id={id} survey={questions} />
      ) : (
        images?.length > 0 && <ImageGrid images={images} handleToggleModal={handleToggleModal} />
      )}
      <ImageModal show={showModal} images={images} onClose={handleToggleModal} />
      {/* Card Content */}
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {content}
        </Typography>
        <Box
          sx={{
            position: 'relative'
          }}
        >
          <FacebookCounter />
        </Box>
      </CardContent>

      <CardActions>
        <Grid container>
          <Grid
            item
            xs={4}
            container
            justify='center'
            alignItems='center'
            position='relative'
            // style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', justifyContent: 'center' }}
            onMouseEnter={() => setShowIcon(true)}
            onMouseLeave={() => setShowIcon(false)}
            className={classes.boxContainer}
          >
            {showIcon && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '-100%',
                  left: 0,
                  zIndex: 10
                }}
              >
                <FacebookSelector
                  onSelect={(key) => {
                    console.log('react:', key.toUpperCase());
                  }}
                />
              </Box>
            )}
            <IconButton aria-label='comments'>
              <ThumbUpOffAltIcon /> <Typography variant='h6'>Thích</Typography>
            </IconButton>
          </Grid>
          <Grid
            item
            xs={4}
            container
            justify='center'
            alignItems='center'
            style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', justifyContent: 'center' }}
          >
            <IconButton aria-label='comments' onClick={handleClickOnComment}>
              <CommentOutlinedIcon /> <Typography variant='h6'>Bình luận</Typography>
            </IconButton>
          </Grid>
          <Grid
            item
            xs={4}
            container
            justify='center'
            alignItems='center'
            style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', justifyContent: 'center' }}
          >
            <IconButton aria-label='share'>
              <Share /> <Typography variant='h6'>Chia sẻ</Typography>
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
      <Divider />
      {/* Comment section */}
      <Box display={isCommentSectionShow ? 'block' : 'none'}>
        <Button onClick={() => handleGetMoreComments()} variant='text'>
          Xem thêm bình luận
        </Button>
        <CardContent>
          {comments.map((comment, index) => (
            <Comment handleDelete={handleDeleteComent} comment={comment} key={index} />
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
