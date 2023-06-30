import React from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './HOC/Layout/CustomerLayout';
import AuthLayout from './HOC/Layout/AuthLayout';
import ArtistLogin from './pages/Artist/ArtistAuth/ArtistLogin';
import ArtistRegister from './pages/Artist/ArtistAuth/ArtistRegister';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import ArtistLayout from './HOC/Layout/ArtistLayout';
import ArtistSongs from './pages/Artist/ArtistDashboard/ArtistSongs';
import SongForm from './pages/Artist/SongForm/SongForm';
import { loadStoredAuthData } from './store/slices/authSlice';
import { Alert,Snackbar } from '@mui/material';
import { removeNotf } from './store/slices/notfSlice';
import ArtistProfile from './pages/Artist/ArtistDashboard/ArtistProfile';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  const authData = useAppSelector(state => state.auth)
  const notfData = useAppSelector(state => state.notf)
  const dispatch = useAppDispatch()
  
  React.useEffect(() => {
    dispatch(loadStoredAuthData())
  }, [dispatch])
  
  const routes = React.useMemo(() => {
    if (authData.user_type === 'unauthorized') {
      return (
        <AuthLayout>
          <Routes>
            <Route path="/login" element={<div>Customer Login</div>} />
            <Route path="/register" element={<div>Customer Register</div>} />
            <Route path="/artist/login/" element={<ArtistLogin />} />
            <Route path="/artist/register/" element={<ArtistRegister />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </Routes>
        </AuthLayout>
      )
    } else if (authData.user_type === 'artist') {
      return (
        <ArtistLayout>
          <Routes>
            <Route path="/" element={<ArtistSongs />} />
            <Route path="/profile" element={<ArtistProfile />} />
            <Route path="/song-form/:songId" element={<SongForm />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </ArtistLayout>
      )
    }
  }, [authData])


  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
          <CssBaseline />
      {routes}
      </ThemeProvider>

      <Snackbar 
          open={notfData.open} 
          autoHideDuration={notfData.duration} 
          onClose={() => dispatch(removeNotf())}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
        <Alert onClose={() => dispatch(removeNotf())} severity={notfData.color}>
          {notfData.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
