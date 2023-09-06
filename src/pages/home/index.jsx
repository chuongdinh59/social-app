import { ThemeProvider } from '@emotion/react';
import { Box, Stack, createTheme } from '@mui/material';
import { useState } from 'react';
import Add from '../../components/Add';
import Feed from '../../components/Feed';
import Navbar from '../../components/Navbar';
import Rightbar from '../../components/Rightbar';
import Sidebar from '../../components/Sidebar';
import { useChangePasswordNavigation } from '../../hooks/useChangePasswordNavigation';
function Home() {
  const [mode, setMode] = useState('light');
  useChangePasswordNavigation();
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
