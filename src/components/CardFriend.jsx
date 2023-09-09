import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
function FriendCard({ img = 'https://mui.com/static/images/cards/contemplative-reptile.jpg' }) {
  return (
    <Card sx={{ display: 'flex', mb: 5, width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component='div' variant='h5'>
            Mac Miller
          </Typography>
          <Button size='small' variant='contained'>
            Kết bạn
          </Button>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}></Box>
      </Box>
      <CardMedia
        component='img'
        sx={{ width: '80%', maxHeight: '150px', objectFit: 'cover' }}
        image={img}
        alt='Live from space album cover'
      />
    </Card>
  );
}

export default FriendCard;
