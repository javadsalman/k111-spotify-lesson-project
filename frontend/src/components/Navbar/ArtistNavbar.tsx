import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import spotifyLogo from '../../assets/images/spotify-logo.png'
import { useNavigate, NavLink } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks';
import { logoutAction } from '../../store/slices/authSlice';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ArtistNavbar() {
  const dispatch = useAppDispatch()
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img width="150" src={spotifyLogo} alt="sptofiy-logo" />

          <Box sx={{ display: 'flex', ml: 'auto' }}>
                <Button
                  onClick={() => dispatch(logoutAction())}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Logout
                </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ArtistNavbar;