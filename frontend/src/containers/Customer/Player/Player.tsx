import * as React from 'react';
import SongInfo from '../../../components/Player/SongInfo';
import PlayerControls from './PlayerControls';
import SoundControls from './SoundControls';

export interface IPlayerProps {
}

export default function Player (props: IPlayerProps) {
  return (
    <div className='grid grid-cols-12 items-center'>
      <div className='col-span-3'>
        <SongInfo title="playlist" text="content" image="https://i.ytimg.com/vi/dpuKVjX6BJ8/maxresdefault.jpg" />
      </div>
      <div className='col-span-6'>
        <PlayerControls />
      </div>
      <div className='col-span-3'>
        <SoundControls  />
      </div>
    </div>
  );
}
