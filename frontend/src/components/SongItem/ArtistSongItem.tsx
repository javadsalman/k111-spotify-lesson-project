import { Button } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';

export interface IArtistSongItemProps {
    title: string
    image: string
    id: number
}

export default function ArtistSongItem (props: IArtistSongItemProps) {
  return (
    <div className='border border-white rounded-lg'>
        <div className='h-46'><img src={props.image} alt="" className='w-full h-64 object-cover rounded-t-lg' /></div>
        <div className='text-3xl font-semibold'>
            <div className='text-center'>{props.title}</div>
            <Link to={`/song-form/${props.id}`}><Button variant='contained' color='success' fullWidth>Edit</Button></Link>
            <Button variant='contained' color='error' fullWidth>Delete</Button>
        </div>
    </div>
  );
}
