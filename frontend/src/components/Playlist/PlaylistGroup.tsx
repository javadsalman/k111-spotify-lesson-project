import * as React from 'react';
import PlaylistCard from './PlaylistCard';
import { IPlaylist } from '../../types';

export interface IPlaylistGroupProps {
  title: string;
  playlistList: IPlaylist[]
}

export default function PlaylistGroup (props: IPlaylistGroupProps) {
  return (
    <div className='mb-10'>
          <div className='text-3xl font-semibold mb-3'>{props.title}</div>
          <div className='flex flex-wrap gap-4'>
            {props.playlistList.map(playlist => {
              return (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              )
            })}
          </div>
        </div>
  );
}
