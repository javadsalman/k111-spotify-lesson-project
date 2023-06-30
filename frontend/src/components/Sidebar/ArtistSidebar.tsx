import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { useAppSelector } from '../../store/hooks';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import PersonIcon from '@mui/icons-material/Person';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { Link } from 'react-router-dom'

export default function ArtistSidebar() {
    const authData = useAppSelector(state => state.auth)
    return (
        <div>
            <div className='p-3 m-5'>
                <div className='flex justify-center mb-3'>
                    <img className='w-40 h-40 object-cover rounded-full' src={authData.image} alt="profile" />
                </div>
                <div className='text-center text-2xl'>
                    {authData.first_name} {authData.last_name}
                </div>
            </div>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <Link to="/">
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar>
                                <QueueMusicIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Songs" secondary="All Songs You Have" />
                    </ListItemButton>
                </Link>
                <Link to="/song-form/new">
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar>
                                <AudiotrackIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Add Song" secondary="Add Your New Song" />
                    </ListItemButton>
                </Link>
                <Link to="/profile">
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Profile" secondary="Edit Your Profile" />
                    </ListItemButton>
                </Link>
            </List>
        </div>
    );
}