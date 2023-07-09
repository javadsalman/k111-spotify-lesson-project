import * as React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LikeButton from '../../../components/UI/LikeButton';
import PlayButton from '../../../components/UI/PlayButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material'
import { ISong } from '../../../types';
import { getArtistText, getDurationFromSeconds } from '../../../utils/textUtils';

export interface ISongListProps {
  songList: ISong[];
  onRemove?: (songId: number) => void
}

export default function SongList(props: ISongListProps) {
  return (
    <div className=''>
      <div className='flex mb-2'>
        <div className='basis-8'>#</div>
        <div className='basis-5/12'>Title</div>
        <div className='basis-4/12'>Genre</div>
        <div className='basis-48'></div>
        <div className='basis-20 flex justify-center'><AccessTimeIcon /></div>
        {props.onRemove && <div className='basis-10 flex justify-center'></div>}
      </div>
      <hr className='border-slate-500' />
      <div>
        {props.songList.map((song, index) => {
          return (
            <div className='flex mt-4 items-center'>
              <div className='basis-8 flex items-center text-lg font-bold'>{index+1}</div>
              <div className='basis-5/12 flex gap-4'>
                <div><img className='w-12 h-12 object-cover' src={song.image} alt="" /></div>
                <div className='flex flex-col justify-center'>
                  <div className='text-lg font-semibold'>{song.title}</div>
                  <div>{getArtistText(song.artists_info)}</div>
                </div>
              </div>
              <div className='basis-4/12'>{song.genre_info.title}</div>
              <div className='basis-48 flex justify-end items-center'>
                <PlayButton running={false} />
                <LikeButton filled={false} />
              </div>
              <div className='basis-20 flex justify-center'>{getDurationFromSeconds(song.duration)}</div>
              {props.onRemove && <div className='basis-10 flex justify-center'>
                <IconButton onClick={() => props.onRemove!(song.id)} >
                  <DeleteIcon style={{ fontSize: 30 }} />
                </IconButton>
              </div>
              }
            </div>
          )
        })}
      </div>
    </div>
  );
}
