import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';

export interface ICustomerSidebarProps {
}

export default function CustomerSidebar(props: ICustomerSidebarProps) {
    return (
        <div className='p-1'>
            <div className='bg-zinc-900 rounded'>
                <List sx={{ width: '100%', maxWidth: 360 }}>
                    <Link to="/">
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar>
                                    <HomeRoundedIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </Link>
                    <Link to="/search">
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar>
                                    <SearchRoundedIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Search" />
                        </ListItemButton>
                    </Link>
                    <Link to="/playlist/new">
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar>
                                    <QueueMusicIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Add Playlist"/>
                        </ListItemButton>
                    </Link>
                </List>
            </div>
        </div>
    );
}
