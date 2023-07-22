import { ThemeProvider } from '@emotion/react';
import { Add } from '@mui/icons-material';
import { Box, Stack, createTheme } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Rightbar from '../../components/Rightbar';
import Feed from '../../components/Feed';
import UserContext from '../../context/UserContext';
function Home() {
  const [mode, setMode] = useState('light');
  const data = useContext(UserContext);
  console.log(data);
  const darkTheme = createTheme({
    palette: {
      mode: mode
    }
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={'background.default'} color={'text.primary'} sx={{ width: '100%' }}>
        <Navbar />
        <Stack direction='row' spacing={2} justifyContent='space-between'>
          <Sidebar setMode={setMode} mode={mode} />
          <Feed />
          <Rightbar />
        </Stack>
        <Add />
      </Box>
    </ThemeProvider>
  );
}

export default Home;
