import * as React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { IconButton } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ISong } from '../../types';
import { getArtistText, getDurationFromSeconds } from '../../utils/textUtils';

export interface IAddableSongListProps {
  songList: ISong[],
  onAdd: (songId: number) => void;
}

export default function AddableSongList (props: IAddableSongListProps) {
  return (
    <div className=''>
      <div className='flex mb-2'>
        <div className='basis-8'>#</div>
        <div className='basis-7/12'>Title</div>
        <div className='basis-2/12'>Genre</div>
        <div className='basis-48'></div>
        <div className='basis-20 flex justify-center'><AccessTimeIcon /></div>
        <div className="basis-10"></div>
      </div>
      <hr className='border-slate-500' />
      <div>
        {props.songList.map((song, index) => {
          return (
            <div key={song.id} className='flex mt-4 items-center'>
              <div className='basis-8 flex items-center text-lg font-bold'>{index+1}</div>
              <div className='basis-7/12 flex gap-4'>
                <div><img className='w-12 h-12 object-cover' src={song.image} alt="" /></div>
                <div className='flex flex-col justify-center'>
                  <div className='text-lg font-semibold'>{song.title}</div>
                  <div>{getArtistText(song.artists_info)}</div>
                </div>
              </div>
              <div className='basis-2/12'>{song.genre_info.title}</div>
              <div className='basis-48 flex justify-end items-center'>
                
              </div>
              <div className='basis-20 flex justify-center'>{getDurationFromSeconds(song.duration)}</div>
              <div className='basis-10'>
                <IconButton onClick={() => props.onAdd(song.id)}>
                    <AddCircleIcon />
                </IconButton>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
