import * as React from 'react';
import LikeSongsImage from '../../../assets/images/liked-songs-image.jpg'
import PlayButton from '../../../components/UI/PlayButton';
import LikeButton from '../../../components/UI/LikeButton';
import SongList from './SongList';

export interface IPlaylistProps {
}

export default function Playlist (props: IPlaylistProps) {
  return (
    <div className='px-10'>
      <div className='flex gap-10 pt-20 mb-7'>
        <div className=' shrink-0'><img src={LikeSongsImage} alt="liked-songs" className='w-56' /></div>
        <div className='flex flex-col justify-end'>
            <div className='font-semibold mb-5'>Playlist</div>
            <div className="text-8xl font-bold mb-10">Liked Songs</div>
            <div><strong>50 songs</strong> about 2 hr 25 min</div>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-10">
        <PlayButton running={false} size={70} />
        <LikeButton filled={false} size={40}/>
      </div>
      <div>
        <SongList songList={[]} />
      </div>
    </div>
  );
}
