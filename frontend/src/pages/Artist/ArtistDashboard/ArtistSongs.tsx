import * as React from 'react';
import ArtistSongItem from '../../../components/SongItem/ArtistSongItem';
import { useAppSelector } from '../../../store/hooks';
import { getSongList } from '../../../api/songApi';
import { ISongSummary } from '../../../types';

export interface IArtistSongsProps {
}

export default function ArtistSongs (props: IArtistSongsProps) {
  const [songs, setSongs] = React.useState<ISongSummary[]>([])

  const authData = useAppSelector(state => state.auth)

  React.useEffect(() => {
    getSongList({artists: authData.id.toString()}, true).then(res => {
      setSongs(res.data)
    })
  }, [authData.id])

  return (
    <div className='p-3'>
      <div className='text-4xl text-center mb-5'>
        My Songs
      </div>
      <div className='flex flex-wrap gap-5'>
        {songs.map((song, index) => {
          return (
            <div key={song.id} className='w-60'>
                <ArtistSongItem id={song.id} title={song.title} image={song.image} />
            </div>
          )
        })}
      </div>
    </div>
  );
}
