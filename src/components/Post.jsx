import { Favorite, FavoriteBorder, MoreVert, Share } from '@mui/icons-material'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  Divider,
  Menu,
  MenuItem
} from '@mui/material'
import Comment from './Comment'
import { useState } from 'react'
const Post = ({ user }) => {
  const [isDeleteOptionVisible, setDeleteOptionVisible] = useState(false)
  const handleClickOnMorevert = () => {
    setDeleteOptionVisible((isDeleteOptionVisible) => !isDeleteOptionVisible)
  }
  const handleDeletePost = () => {}
  const [comment, setComment] = useState('')
  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }
  const handleAddComment = () => {
    if (comment.trim() !== '') {
      const newComment = {
        user: user,
        content: comment
      }
      setComments([...comments, newComment])
      setComment('')
    }
  }

  const [isCommentSectionShow, setIsCommentSectionShow] = useState(false)
  const [comments, setComments] = useState([{ user: 'abc', content: 'ABC' }])
  const handleClickOnComment = () => {
    setIsCommentSectionShow((current) => !current)
  }
  const handleClickOnAction = () => {}

  return (
    <Card sx={{ margin: 5 }}>
      <Box>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'red' }} aria-label='recipe' src=''>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label='settings' onClick={handleClickOnMorevert}>
              <MoreVert />
            </IconButton>
          }
          title='John Doe'
          subheader='September 14, 2022'
        />
        {isDeleteOptionVisible && (
          <Menu
            id={`delete-option-menu`}
            anchorEl={document.getElementById(`delete-option-menu`)}
            open={isDeleteOptionVisible}
            onClose={() => setDeleteOptionVisible(false)}
            className='Hung28'
          >
            <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
          </Menu>
        )}
      </Box>
      <CardMedia
        component='img'
        height='20%'
        image='https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        alt='Paella dish'
      />
      {/* Card Content */}
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of
          frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites' sx={{ border: '1px' }} onClick={handleClickOnAction}>
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: 'red' }} />} />
          <Typography>100</Typography>
        </IconButton>
        <IconButton aria-label='comments' onClick={handleClickOnComment}>
          <CommentOutlinedIcon />
          <Typography>100</Typography>
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
  )
}

export default Post
